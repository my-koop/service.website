export function addRoutes(metaData: any) {
  /*FIXME: Make that work...
  metaData.addRoute({
    idPath: "public",
    //HOW?: component: "PublicWrapper",
    name: "Homepage",
    path: "/"
  });
  */

  //FIXME: Like this until we can do it with addRoute...
  metaData.addData({
    routes: {
      public: {
        handler: {origin: "components/PublicWrapper"},
        name: "Homepage",
        path: "/",
        children: {
          homepage: {
            default: true,
            handler: {origin: "components/Homepage"}
          },
          aboutUs: {
            handler: {origin: "components/PlaceHolder"},
            name: "About Us",
            path: "/aboutus"
          },
          myAccount: {
            handler: {origin: "components/MyAccountPage"},
            name: "My Account",
            path: "/myaccount"
          },
          shop: {
            handler: {origin: "components/ParentPlaceHolder"},
            name: "Shop",
            path: "/shop",
            children: {
              storefront: {
                default: true,
                handler: {origin: "components/PlaceHolder"}
              },
              cart: {
                handler: {origin: "components/PlaceHolder"},
                name: "Shopping Cart",
                path: "/shop/cart"
              }
            }
          }
        }
      }
    }
  });
}
