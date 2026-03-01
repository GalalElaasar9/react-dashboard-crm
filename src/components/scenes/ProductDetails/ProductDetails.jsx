import { Box, Typography, useTheme } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { Circles } from "react-loader-spinner";
import { tokens } from "../../../theme";
import { useQuery } from "@tanstack/react-query";
import api from "../../Apis/Apis";

export default function ProductDetails() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { id, category } = useParams();

  // ----------- Product Details Query -----------
  const getProductDetails = async (id) => {
    const { data } = await api.get(`/products/${id}`);
    return data;
  };

  const { data: productDetails, isLoading: loadingProductDetails, isError: errorProductDetails} = useQuery({
    queryKey: ["products", id],
    queryFn: () => getProductDetails(id),
    staleTime: 1000 * 60 * 5,
    retry: 3,
    enabled: !!id,
    // placeholderData: (previousData) => previousData
  });

  // ----------- Related Products Query -----------
  async function getRelatedProducts() {
    const { data } = await api.get(`/products/category/${category}`);
    return data.products.filter(product => product.id !== Number(id));
  }
  

  const {data: relatedProducts, isLoading: loadingRelatedProducts, isError: errorRelatedProducts} = useQuery({
    queryKey: ["relatedProducts", id , category],
    queryFn: getRelatedProducts,
    retry: 3,
    enabled: !!category,
    placeholderData: (previousData) => previousData
  });
  
  // ----------- Loading & Error States -----------
  if (errorProductDetails) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Box
          bgcolor={colors.blueAccent[700]}
          className="alert text-center w-[50%] font-bold"
        >
          Error Loading Product
        </Box>
      </div>
    );
  }

  if (loadingProductDetails) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Circles height="80" width="80" color="#4fa94d" ariaLabel="loading" />
      </div>
    );
  }

  // ----------- Main JSX -----------
  return (
    <div className="px-4 md:px-4">
      {/* Product Info */}
      <div className="items-center grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-5">
        <div className="image w-full">
          <img
            src={productDetails?.images?.[0] || "/placeholder.jpg"}
            alt={productDetails?.title || "Product Image"}
            className="w-full"
          />
        </div>
        <div className="details">
          <h1 className="font-bold text-3xl mb-3">{productDetails?.title}</h1>
          <Typography
            variant="body1"
            sx={{ fontSize: "16px" }}
            className="mb-5"
            color={colors.greenAccent[300]}
          >
            {productDetails?.description}
          </Typography>
          <div className="flex justify-between text-sm my-3">
            <span>Price: {productDetails?.price} $</span>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="relatedProducts mt-8">
        <h2 className="text-xl font-bold mb-3">Related Products</h2>

        {loadingRelatedProducts ? (
          <div className="flex justify-center mt-3">
            <Circles height="40" width="40" color="#4fa94d" ariaLabel="loading" />
          </div>
        ) : errorRelatedProducts ? (
          <Box color={colors.redAccent[500]} fontWeight="bold">
            Failed to load related products
          </Box>
        ) : relatedProducts?.length > 0 ? (
          <div className="grid gap-3 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 mt-3">
            {relatedProducts.map((relatedProduct) => (
              <div
                key={relatedProduct.id}
                className="shadow px-3 py-2 rounded relative overflow-hidden cursor-pointer group"
              >
                <Link
                  to={`/productDetails/${relatedProduct.id}/${relatedProduct.category}`}
                  style={{ textDecoration: "none" }}
                >
                  <img
                    className="w-full"
                    src={relatedProduct?.images?.[0] || "/placeholder.jpg"}
                    alt={relatedProduct?.title || "Related Product"}
                  />
                  <Typography
                    variant="h4"
                    sx={{ mt: 1, mb: 0 }}
                    color={colors.grey[100]}
                  >
                    {relatedProduct.title}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ mt: 1, mb: 0 }}
                    color={colors.grey[100]}
                  >
                    {relatedProduct.category}
                  </Typography>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <Box color={colors.grey[400]}>No related products found.</Box>
        )}
      </div>
    </div>
  );
}
