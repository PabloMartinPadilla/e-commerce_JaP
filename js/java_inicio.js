document.addEventListener("DOMContentLoaded", ()=>{
    const form= document.getElementById("login");
    form.addEventListener("submit",(evento)=>{
        evento.preventDefault();
        const emailInput = document.querySelector("#email")
        const contraInput = document.querySelector("#contrasena")
        if(emailInput.value =="" || contraInput.value =="" ){
            document.getElementById("alert").style.display="block"
        } else{
        location.href='inicio.html'   
        }  
    })
    })
    
    function esconder(){
        document.getElementById("alert").style.display="none"
    }
    
    function login(usuario, contra){
        console.log("usuario :", usuario);
        console.log("contraseña :", contra);
    }