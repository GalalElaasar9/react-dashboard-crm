import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, useTheme} from "@mui/material";
import { useState, useEffect, useContext } from "react";
import api from "../Apis/AuthApis";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { tokens } from "../../theme";
import { brandContext } from "../../Context/BrandProvider";
import { CategoryContext } from "../../Context/CategoryProvider";
export default function ProductFormDialog({open , setOpen , mode , product}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const queryClient = useQueryClient();
  const {data} = useContext(brandContext)
  
  const {data:categoryData} = useContext(CategoryContext)
  console.log(categoryData);

  // Form State
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [colorsList, setColorsList] = useState([]);
  const [sizesList, setSizesList] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(()=>{
    if (mode === "edit" && product) {
      setName(product.name);
      setPrice(product.price);
      setStock(product.stock);
      setDescription(product.description);
      setBrand(product.brand?._id || "");
      setCategory(product.category?._id || "");
      setColorsList(product.colors ? JSON.parse(product.colors[0]) : []);
      setSizesList(product.sizes ? JSON.parse(product.sizes[0]) : []);
      setImages([]);
    }else{
      setName("");
      setPrice("");
      setStock("");
      setDescription("");
      setBrand("");
      setCategory("");
      setColorsList([]);
      setSizesList([]);
      setImages([]);
    }
  },[mode , product , open])

  const mutation = useMutation({
    mutationFn: async (productData) => {
      const formData = new FormData();
      Object.entries(productData).forEach(([key, value]) => {
        if (key === "images") {
          value.forEach((file) => formData.append("images", file));
        } else {
          formData.append(key, value);
        }
      });

      if (mode === "add") {
        const { data } = await api.post("/products", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        return data;
      } else {
        const { data } = await api.put(`/products/${product._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        return data;
      }
    },
      onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      setOpen(false);
      toast.success(`Product ${mode === "add" ? "added" : "updated"} successfully!`);
    },
    onError: (err) => toast.error(err.response?.data?.message || "Error!"),
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ name, price, stock, description, brand, category, colors: JSON.stringify(colorsList), sizes: JSON.stringify(sizesList), images });
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
      <DialogTitle>{mode === "add" ? "Add Product" : "Edit Product"}</DialogTitle>
      <DialogContent>
        <Box component="form" display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
          <TextField label="Price" value={price} onChange={(e) => setPrice(e.target.value)} fullWidth />
          <TextField label="Stock" value={stock} onChange={(e) => setStock(e.target.value)} fullWidth />
          <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} multiline rows={3} fullWidth />

          {/* Brand select */}
          <TextField select label="Brand" value={brand} onChange={(e) => setBrand(e.target.value)} fullWidth>
            {data?.data.map((b) => <MenuItem key={b._id} value={b._id}>{b.name}</MenuItem>)}
          </TextField>

          {/* Category select */}
          <TextField select label="Category" value={category} onChange={(e) => setCategory(e.target.value)} fullWidth>
            {categoryData?.data.map((c) => <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>)}
          </TextField>

          {/* Colors input */}
          <TextField
            label="Colors (comma separated hex)"
            value={colorsList.join(",")}
            onChange={(e) => setColorsList(e.target.value.split(",").map(c => c.trim()))}
            fullWidth
          />

          {/* Sizes input */}
          <TextField
            label="Sizes (comma separated)"
            value={sizesList.join(",")}
            onChange={(e) => setSizesList(e.target.value.split(",").map(s => s.trim()))}
            fullWidth
          />

          {/* Images upload */}
          <input type="file" multiple accept="image/*" onChange={(e) => setImages(Array.from(e.target.files))} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleSubmit}>
          {mode === "add" ? "Add Product" : "Update Product"}
        </Button>
        <Button variant="contained" onClick={() => setOpen(false)}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
