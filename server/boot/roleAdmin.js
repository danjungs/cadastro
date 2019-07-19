module.exports = function(app){
    var usuario = app.models.usuario
    var Role = app.models.Role;
    var RoleMapping = app.models.RoleMapping;
    var admin;

    var params = {'role': 'admin'};
    var userPromise = usuario.findOne(params);
    userPromise.then(function(user) {
        admin = user[0]
        console.log('Printando auqi o admin> '+admin)
        }, function(err) {
        
        throw(err);
    });
    
    if (!admin){
        console.log ('ESTAMOS CRIANDO UM CACETA DE USER')
        var createUserPromise = usuario.create([
            { username:'admin',email:'admin@ibm.com',password:'admin',role:'admin'}
        ])
        createUserPromise.then(function(user){
            console.log('Printando auqi o user criado!!> '+user)
            admin =user;
        },function(err){
            if (err) throw err;
        })
    }

    var rolePromise = Role.findOne({name:"admin"});
    rolePromise.then(function(role) {
        console.log('A role achada eh: '+role)
        console.log(admin+'ESSE EH O ADMIN')
        role.principals.create({
            principalType: RoleMapping.USER,
            principalId: admin.id
            },(err, principal) =>{
                if (err){ 
                  throw err;
                }
        });

    }, function(err) {
        Role.create({name: 'admin'},(err, role) =>{
            if (err) {
                throw err;
            }
            console.log('Created role:', role);
            role.principals.create({
                principalType: RoleMapping.USER,
                principalId: admin.id
                },(err, principal) =>{
                    if (err){ 
                      throw err;
                    }
            });
        })
    });

    }
    /*
    usuario.findOne({ role:'batata'},(err,users) => {
        console.log()
        if(!users){
            usuario.create([
                { username:'admin',email:'admin@ibm.com',password:'admin',role:'admin'}
            ],(err,user) =>{
                if(err) throw(err);
                Role.findOne({name:'admin'}, (err,role)=>{
                  if (err) throw err;
                  if(!role){
                      Role.create({name: 'admin'},(err, role) =>{
                          if (err) throw err;
                          console.log('Created role:', role);
                          role.principals.create({
                              principalType: RoleMapping.USER,
                              principalId: user.id
                              },(err, principal) =>{
                                  if (err){ 
                                    throw err;
                                  }
                          });
                      })
                  }
              })
            })
        }
    })
}

*/