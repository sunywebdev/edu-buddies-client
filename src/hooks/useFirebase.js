import { useEffect, useState } from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  getIdToken,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import initializeAuth from "../Firebase/firebase.init";
import axios from "axios";
import Swal from "sweetalert2";

initializeAuth();

const useFirebase = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const [isLoading, setIsloading] = useState(true);
  const [admin, setAdmin] = useState(false);
  const [student, setStudent] = useState(false);
  const [teacher, setTeacher] = useState(false);
  const [data, setData] = useState([]);

  const [token, setToken] = useState("");
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  const signInUsingGoogle = (navigate, location) => {
    setIsloading(true);
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result?.user;
        saveOrReplaceUserToDb(
          user?.email,
          user?.displayName,
          user?.photoURL,
          navigate,
          location
        );
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      })
      .finally(() => setIsloading(false));
  };
  const resetPassword = (auth, email, navigate, location) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Please Check Your Email Inbox",
          showConfirmButton: false,
          timer: 2000,
        }).then(function() {
          const destination = location?.state?.from || "/";
          navigate(destination);
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        Swal.fire({
          icon: "error",
          title: errorMessage,
          showConfirmButton: false,
          timer: 2000,
        });
        setError(errorMessage);
      })
      .finally(() => setIsloading(false));
  };

  const createNewUserUsingEmailPassword = (
    auth,
    email,
    password,
    displayName,
    navigate,
    location
  ) => {
    const URL = "https://teamssyaan.blob.core.windows.net/images/user.png";
    setIsloading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        sendEmailVerification(auth.currentUser);
        setUser(res.user);
        profileUpdate(displayName, URL);
        saveUserToDb(email, displayName, URL, navigate, location);
      })
      .catch((error) => {
        const errorMessage = error.message;
        Swal.fire({
          icon: "error",
          title: errorMessage,
          showConfirmButton: false,
          timer: 2000,
        });
        setError(errorMessage);
      })
      .finally(() => setIsloading(false));
  };

  const signInWithEmailPassword = (
    auth,
    email,
    password,
    navigate,
    location
  ) => {
    setIsloading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Login Successfull",
          showConfirmButton: false,
          timer: 2000,
        }).then(function() {
          const destination = location?.state?.from || "/";
          navigate(destination);
        });
      })

      .catch((error) => {
        const errorMessage = error.message;
        Swal.fire({
          icon: "error",
          title: errorMessage,
          showConfirmButton: false,
          timer: 2000,
        });
        setError(errorMessage);
      })
      .finally(() => setIsloading(false));
  };

  //update profile
  const profileUpdate = (name, URl) => {
    updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: URl,
    })
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };

  const saveUserToDb = (email, displayName, photoURL, navigate, location) => {
    const save = {
      email,
      displayName,
      photoURL,
    };
    axios
      .post(`http://localhost:5000/signup`, save)
      .then(function(response) {
        Swal.fire({
          icon: "success",
          title: "Please Check Your Email Inbox to Verify New Account",
          showConfirmButton: true,
          timer: 3000,
        }).then(function() {
          const destination = location?.state?.from || "/login";
          navigate(destination);
        });
      })
      .catch(function(error) {
        Swal.fire({
          icon: "error",
          title: error,
          showConfirmButton: false,
          timer: 3000,
        });
        console.log(error);
      });
  };
  const saveOrReplaceUserToDb = (
    email,
    displayName,
    photoURL,
    navigate,
    location
  ) => {
    const save = { email, displayName, photoURL };
    axios
      .put(`https://fierce-caverns-90976.herokuapp.com/login`, save)
      .then(function(response) {
        Swal.fire({
          icon: "success",
          title: "Login Successfull",
          showConfirmButton: false,
          timer: 2000,
        }).then(function() {
          const destination = location?.state?.from || "/";
          navigate(destination);
        });
      })
      .catch(function(error) {
        Swal.fire({
          icon: "error",
          title: error,
          showConfirmButton: false,
          timer: 2000,
        });
        console.log(error);
      });
  };

  /*------ to findout user is admin or not---------- */
  //   useEffect(() => {
  //     fetch(`https://fierce-caverns-90976.herokuapp.com/users/${user?.email}`)
  //       .then((res) => res.json())
  //       .then((data) => setAdmin(data?.admin));
  //   }, [user?.email]);

  const logOut = () => {
    console.log("fro header");
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch((error) => {})
      .finally(() => setIsloading(false));
  };

  // is admin
  useEffect(() => {
    axios
      .get(`http://localhost:5000/getUserRole/${user.email}`)
      .then((data) => {
        const result = data.data[0];
        console.log(result.role);
        if (result.role == "Admin") {
          setAdmin(true);
        } else if (result.role == "Teacher") {
          setTeacher(true);
        } else if (result.role == "Student") {
          setStudent(true);
        }
      });
  }, [user.email]);

  useEffect(() => {
    const unSubscribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setError("");
        getIdToken(user).then((idToken) => setToken(idToken));
      } else {
        setUser({});
      }
      setIsloading(false);
    });
    return () => unSubscribed;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);
  return {
    auth,
    user,
    error,
    signInUsingGoogle,
    createNewUserUsingEmailPassword,
    signInWithEmailPassword,
    logOut,
    isLoading,
    resetPassword,
    admin,
    student,
    teacher,
    token,
  };
};

export default useFirebase;
