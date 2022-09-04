document.addEventListener("DOMContentLoaded", ()=>{
    const form= document.getElementById("login");
    form.addEventListener("submit",(evento)=>{
        evento.preventDefault();
        const email = document.querySelector("#email").value;
        const contra = document.querySelector("#contrasena").value;
        if(email =="" || contra =="" ){
            document.getElementById("alert").style.display="block";
        }
        
        else{
        window.location.href = "inicio.html";
        localStorage.setItem("userEmail", email);   
        }  
    })
    });
    
    function esconder(){
        document.getElementById("alert").style.display="none";
    };
    