import { Router } from "express";
import passport from "passport";

const router = Router()

router.post("/login", passport.authenticate("login", { failureRedirect: '/session/failedLogin' }), async (req, res) => {
if(!req.user) return res.status (400).send({status:"error",erorr:"Credenciales Incorrectas"})
req.session.user={
    first_name:req.user.first_name,
    last_name:req.user.last_name,
    age:req.user.age,
    email:req.user.email,
}
res.render("prfile",{user:req.session.user})
})
router.get('/github',passport.authenticate('github',{scope:['user:email']}));

router.get('/github/callback',passport.authenticate('github',{failureRedirect:'/login'}),async (req,res)=>{
    req.session.user=req.user;
    res.redirect('/profile')
})

router.get('/failregister', (req, res) => {
    console.log("Hubo un problema en el registro del usuario")
    res.send({status:'failure',message:"Hubo un problema en el registro del usuario"})
})

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/')
})

export default router;