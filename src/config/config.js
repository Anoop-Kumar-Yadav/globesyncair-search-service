const dotenv = require("dotenv");
const path = require("path");
const Joi = require("joi");

// Provided custom path
dotenv.config({ path: path.join(__dirname + `../../../.env`) });

/* -------------------------------------------------------------------------- */
/*     // DEFINING JOI SCHEMA FOR ENVIRONMENT VARIABLES - (E.G., PORT MUST BE A NUMBER)    */
/* -------------------------------------------------------------------------- */
const envVarSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid("production", "development").required(),
    PORT: Joi.number().default(3000),
  })
  .unknown();

/* -------------------------------------------------------------------------- */
/*     CHECK VALIDATION OF PROCEES.ENV , IF IT IS ACCORDING TO OUR SCHEMA     */
/* -------------------------------------------------------------------------- */
const validationResult = envVarSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

const validationError = validationResult.error;
if (validationError) {
  throw new Error(`Config validation error: ${validationError.message}`);
}

/* -------------------------------------------------------------------------- */
const envVars = validationResult.value;

module.exports = {
  NODE_ENV: envVars.NODE_ENV,
  PORT: envVars.PORT,
  DB_USERNAME: envVars.DB_USERNAME,
  DB_PASSWORD: envVars.DB_PASSWORD,
  DB_NAME: envVars.DB_NAME,
  DB_TEST_NAME: envVars.DB_TEST_NAME,
  DB_HOST: envVars.DB_HOST,
  DB_PORT: envVars.DB_PORT,
};
