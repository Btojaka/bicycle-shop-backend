import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: "3.0.2",
    tags: [
      {
        name: "Products",
        description: "API operations related to products in the bicycle shop.",
      },
    ],
    info: {
      title: "Documentation REST API Bicycle Shop",
      version: "1.0.0",
      description: "API Documentation for the project:",
      contact: {
        name: "Btojaka",
        url: "https://github.com/Btojaka/bicycle-shop-backend",
      },
    },
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerUiOptions: SwaggerUiOptions = {
  //   customCss: `
  //         .topbar-wrapper .link {
  //             display: none !important; // Hide the Swagger logo
  //         }
  //     `,
  customSiteTitle: "Documentation REST API Bicycle Shop",
};
export default swaggerSpec;
export { swaggerUiOptions };
