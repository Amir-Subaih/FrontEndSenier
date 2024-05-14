export const UserValidation=(user)=>{
    let errors={};
    if(user.name.trim()==""){
        errors.name="Please enter a name";
    }
    
    if(user.email.trim()==""){
        errors.email="Please enter a email";
    }

    if(user.subject.trim()==""){
        errors.subject="Please enter a subject";
    }
    // else if(user.password.trim().length<8)
    // {
    //     errors.password="password must be at least 8 characters";
    // }

    if(user.message.trim()==""){
        errors.message="Please enter a message";
    }
    return errors;
// console.log(errors);
}