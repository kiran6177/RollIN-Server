import { UserAuth  } from "./user/userAuthController.js";
import { UserLogout } from "./user/logoutController.js";
import { AdminLogin } from "./admin/adminLoginController.js";
import { AdminLogout } from "./admin/adminLogoutController.js";
import { TheatreSignup } from "./theatre/theatreSignupController.js";
import { TheatreLogout } from "./theatre/theatreLogoutController.js";
import { TheatreLogin } from "./theatre/theatreLoginController.js";
import { TheatreProfileComplete } from "./theatre/theatreCompleteProfileController.js";
import { TheatreOtpVerify } from "./theatre/theatreOtpVerifyController.js";
import { TheatreResend } from "./theatre/theatreResendOtpController.js";
import { UserVerifyOtp } from "./user/userVerifyOtpController.js";

export {
    UserAuth as  UserAuthController,
    UserLogout as UserLogoutController,
    AdminLogin as AdminLoginController,
    AdminLogout as AdminLogoutController,
    TheatreSignup as TheatreSignupController,
    TheatreLogout as TheatreLogoutContrller,
    TheatreLogin as TheatreLoginController,
    TheatreProfileComplete as TheatreProfileCompleteController,
    TheatreOtpVerify as TheatreOtpVerifyController,
    TheatreResend as TheatreResendOtpController,
    UserVerifyOtp as UserVerifyOtpController
}