const users = require("../Model/UserProfile");

module.exports = class UserProfileService {

    static async insertUserProfile(userProfile){
        return usersProfiles.
        create(userProfile).then((value)=>{
            return value;
        })
        .catch((error)=> {
            return null;
        });
    }

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
