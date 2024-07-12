export const otpValidator = async (otpTime)=>{
    try {

        console.log("milisec",otpTime);

        const currentDate = new Date();
        let differValue = (otpTime - currentDate.getTime())/1000;
        differValue/=60;

        const minutes = Math.abs(differValue)

        console.log("expiredTime",minutes);

        if(minutes > 2){
            return true;
        }

        return false;
        
    } catch (error) {
        console.log(error);
    }
}