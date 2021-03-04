import { push } from "connected-react-router";
import { auth, db, FirebaseTimestamp } from "../../firebase/index";
import { AppDispatch } from '../store/store'
import { signInAction, signOutAction } from "./slice";

export const listenAuthState = () => {
  return async (dispatch: AppDispatch) => {
    return auth.onAuthStateChanged(user => {
      if (user) {
        const uid = user.uid;
        db.collection("users")
          .doc(uid)
          .get()
          .then((snapshot) => {
            const data = snapshot.data();

            if (data) {
              dispatch(
                signInAction({
                  isSignedIn: true,
                  uid: uid,
                  username: data.username,
                })
              );
            }
          });
      } else {
        dispatch(push("/"));
      }
    })
  }
}

export const signUp = (
  username: string,
  email: string,
  password: string,
  confiramPassword: string
) => {
  return async (dispatch: AppDispatch) => {
    if (
      username === "" ||
      email === "" ||
      password === "" ||
      confiramPassword === ""
    ) {
      alert("必須項目が未入力です");
      return false;
    }

    if (password !== confiramPassword) {
      alert("パスワードが一致しません。もう一度お試しください");
      return false;
    }

    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        const user = result.user;

        if (user) {
          const uid = user.uid;
          const timestamp = FirebaseTimestamp.now();

          const userInitialData = {
            created_at: timestamp,
            email: email,
            uid: uid,
            updated_at: timestamp,
            username: username,
          };

          db.collection("users")
            .doc(uid)
            .set(userInitialData)
            .then(() => dispatch(push("/todo")));
        }
      });
  };
};

export const signIn = (email: string, password: string) => {
  return async (dispatch: AppDispatch) => {
    if (email === "" || password === "") {
      alert("必須項目が未入力です");
      return false;
    }

    await auth.signInWithEmailAndPassword(email, password).then((result) => {
      const user = result.user;

      if (user) {
        const uid = user.uid;
        db.collection("users")
          .doc(uid)
          .get()
          .then((snapshot) => {
            const data = snapshot.data();

            if (data) {
              dispatch(
                signInAction({
                  isSignedIn: true,
                  uid: uid,
                  username: data.username,
                })
              );
            } else {
              console.log('失敗');
              
            }

            dispatch(push("/todo"));
          });
      }
    });
  };
};

export const signOut = () => {
  return async (dispatch: AppDispatch) => {
    auth.signOut()
      .then(() => {
        dispatch(signOutAction())
        dispatch(push('/'))
      })
  }
}

export const resetPassword = (email: string) => {
  return async (dispatch: AppDispatch) => {
    if (email === "") {
      alert("必須項目が未入力です")
      return false
    } else {
      auth.sendPasswordResetEmail(email)
        .then(() => {
          alert('入力されたパスワードにリセット用のメールを送りました')
          dispatch(push('/signin'))
        }).catch(() => {
          alert('パスワードリセットに失敗しました。通信環境を確認してください。')
        })
    }  
    
    
  }
}
