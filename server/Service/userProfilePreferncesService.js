const users = require("../Model/UserProfile");

module.exports = class UserProfilePrefernceService {

    static async insertUserProfilePrefernces(UserProfilePrefernce){
        return UserProfilePrefernces.
        create(UserProfilePrefernce).then((value)=>{
            return value;
        })
        .catch((error)=> {
            return null;
        });

    }
 
};
