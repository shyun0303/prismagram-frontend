import React, { useState } from "react";
import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import { LOG_IN, CREATE_ACCOUNT, CONFIRM_SECRET, LOCAL_LOG_IN } from "./AuthQueries";
import { toast } from "react-toastify";

export default () => {
  const [action, setAction] = useState("logIn");
  const username = useInput("");
  const firstName = useInput("");
  const lastName = useInput("");
  const email = useInput("");
  const secret = useInput("");
 /*=========================================================*/
  const requestSecretMutation = useMutation(LOG_IN, {

    variables: { email: email.value }
  });
  const createAccountMutation = useMutation(CREATE_ACCOUNT, {
    variables: {
      email: email.value,
      username: username.value,
      firstName: firstName.value,
      lastName: lastName.value
    }
  });
  const confirmSecretMutation = useMutation(CONFIRM_SECRET,{
     variables:{
       email:email.value,
       secret:secret.value
     }
  })
  const localLogInMutation = useMutation(LOCAL_LOG_IN);
/*=========================================================*/
  const onSubmit = async(e) => {
    e.preventDefault();
    if (action === "logIn") {
      if (email.value !== "") {
       try{
         const {data:{requestSecret}}= await requestSecretMutation();
      
           if (!requestSecret) {
            toast.error("You dont have an account yet, create one");
            setTimeout(() => setAction("signUp"), 3000);
          }else{
            toast.success("Check your inbox for your login secret");
            setAction("confirm");
          }
    }
       catch{
           toast.error("비밀코드를 받을수 없어요, 다시ㅎㅐ보세요.")
       }
      } else {
        toast.error("Email is required");
      }
    } else if (action === "signUp") {
      if (
        email.value !== "" &&
        username.value !== "" &&
        firstName.value !== "" &&
        lastName.value !== ""
      ) {
        try{
            const {data:{createAccount}
          } = await createAccountMutation();
            if(!createAccount){
                toast.error("아이디 만들기 실패")
            }else{
                toast.success("아이디 만들기 성공, 로그인 하세요.")
                setTimeout(()=>setAction("logIn"),3000);
            }
        }
        catch{toast.error("아이디를 만들 수 없어요.")}
      } else {
        toast.error("All field are required");
      }
    } else if(action === "confirm"){
      if(secret.value!==""){
        try{
          const {data:{confirmSecret:token}}=await confirmSecretMutation();
          if(token !=="" || token !==undefined){
            localLogInMutation({variables:{token}});
          }
        }catch{
          toast.error("비밀코드 안맞아요.")
        }
      }
    }
  };

  return (
    <AuthPresenter
      setAction={setAction}
      action={action}
      username={username}
      firstName={firstName}
      lastName={lastName}
      email={email}
      secret={secret}
      onSubmit={onSubmit}
    />
  );
};