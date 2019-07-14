module.exports = function(app){
    var usuario = app.models.usuario
    var Role = app.models.Role;
    var RoleMapping = app.models.RoleMapping;


    usuario.findOne({ role:'admin'},(err,users) => {
        if(!users){
            usuario.create([
                { username:'admin',email:'admin@ibm.com',password:'admin',role:'admin'}
            ],(err,users) =>{
                if(err) throw(err);
            })
        }
        Role.findOne({name:'admin'}, (err,role)=>{
            if (err) throw err;
            if(!role){
                Role.create({name: 'admin'},(err, role) =>{
                    if (err) throw err;
                    console.log('Created role:', role);
                })
            }
            role.principals.create({
            principalType: RoleMapping.USER,
            principalId: users.id
            },(err, principal) =>{
              if (err) throw err;
              console.log('Created principal:', principal);
            });
        })

    })
}