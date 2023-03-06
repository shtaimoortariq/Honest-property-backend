const express = require("express");
const router = express.Router();
const multerUpload = require("../lib/multer");
const oauthController = require("../controllers/oauth");
const userController = require("../controllers/user");
const mediaController = require("../controllers/media");
const roomController = require("../controllers/room");
const utilityProviderController = require("../controllers/utility_provider");
const energyProviderController = require("../controllers/energy_provider");
const bathroomProviderController = require("../controllers/bathroom_provider");
const bedroomProviderController = require("../controllers/bedroom_provider");
const kitchenProviderController = require("../controllers/kitchen_provider");
const telecomProviderController = require("../controllers/telecom_provider");
const additionalFeatureProviderController = require("../controllers/additional_feature_provider");
const propertyInfoController = require("../controllers/property_info");
const propertyProfileController = require("../controllers/property_profile");
const userVerificationController = require("../controllers/user_verification");

module.exports = (requireAuth, localAuth) => {
	/* authentication routes */
	router.post("/v1/oauth/login", oauthController.login);
	router.get("/v1/oauth/token/validate", oauthController.validateToken);
	router.get("/v1/oauth/token/refresh", oauthController.refreshToken);

	/* User routes */
	const cpUpload = multerUpload.fields([{ name: "fileName", maxCount: 10 }]);
	router.post("/v1/user/signup", userController.signUp);
	router.post("/v1/user/signin", userController.signIn);
	//todo: User update profile: Firstname, Lastname, phone number and address.
	router.post("/v1/user/profile", userController.updateProfile);
	router.post("/v1/user/profileImage", requireAuth, cpUpload, userController.uploadProfileImage);
	router.get("/v1/user/profileImage", requireAuth, userController.readProfileImage);

	// property endpoints
	router.get("/v1/user/property", requireAuth, userController.readProperty);
	router.post("/v1/user/property/update", requireAuth, userController.updateProperty);

	/* User Password routes */
	router.post("/v1/user/password/reset/verification", userVerificationController.sendVerificationEmail);
	router.post("/v1/user/password/reset/update", userVerificationController.resetPassword);

	/* Media routes */
	//todo: Handle multiple images with same name
	router.post("/v1/media/save/image", requireAuth, cpUpload, mediaController.saveImage);
	router.post("/v1/media/update", requireAuth, mediaController.updateMedia);
	router.get("/v1/media/listAll", requireAuth, mediaController.listAllMedia);
	router.get("/v1/media/get", requireAuth, mediaController.readMedia);
	router.delete("/v1/media/delete", requireAuth, mediaController.deleteMedia);

	/* Room routes */
	router.post("/v1/room/create", requireAuth, roomController.createRoom);
	router.get("/v1/room/getRoom", requireAuth, roomController.getRoomForUser);
	router.get("/v1/room/listAllTypes", requireAuth, roomController.listAllTypes);
	router.get("/v1/room/listAllBedroomTypes", requireAuth, roomController.listAllTypes);

	/* Bathroom Provider Routes */
	router.get("/v1/bathroom/listAll", bathroomProviderController.listAll);
	router.post("/v1/bathroom/add", requireAuth, bathroomProviderController.add);

	/* Bedroom Provider Routes */
	router.get("/v1/bedroom/listAll", bedroomProviderController.listAll);
	router.post("/v1/bedroom/add", requireAuth, bedroomProviderController.add);

	/* Kitchen Provider Routes */
	router.get("/v1/kitchen/listAll", kitchenProviderController.listAll);
	router.post("/v1/kitchen/add", requireAuth, kitchenProviderController.add);

	/* Telecom Provider Routes */
	router.get("/v1/telecom/listAll", telecomProviderController.listAll);
	router.post("/v1/telecom/add", requireAuth, telecomProviderController.add);

	/* Utility Provider Routes */
	router.get("/v1/utilityprovider/listAll", utilityProviderController.listAll);
	router.post("/v1/utilityprovider/add", requireAuth, utilityProviderController.add);

	/* Energy Provider Routes */
	router.get("/v1/energy/listAll", energyProviderController.listAll);
	router.post("/v1/energy/add", requireAuth, energyProviderController.add);

	/* additional feature Provider Routes */
	router.get("/v1/additionalFeature/listAll", additionalFeatureProviderController.listAll);
	router.post("/v1/additionalFeature/add", requireAuth, additionalFeatureProviderController.add);

	// Property
	router.get("/v1/property", requireAuth, propertyInfoController.getPropertyDetails);

	// Property Info Routes
	router.post("/v1/property/propertyinfo/create", requireAuth, propertyInfoController.createPropertyInfo);
	router.post("/v1/property/propertyinfo/update", requireAuth, propertyInfoController.updatePropertyInfo);
	router.get("/v1/property/propertyinfo/getbypropid", requireAuth, propertyInfoController.getPropertyInfoByPropertyId);

	// Property Profile routes
	router.post("/v1/property/propertyprofile/create", requireAuth, propertyProfileController.createPropertyProfile);
	router.post("/v1/property/propertyprofile/update", requireAuth, propertyProfileController.updatePropertyProfile);

	/* Environment variable routes */
	router.get("/v1/env/host", oauthController.getHost);

	return router;
};
