import * as React from "react";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import axios from "axios";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import DetailDialog from "./DetailDialog";
import Grid from "@mui/material/Grid";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [searchProduct, setSearchProduct] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [selectedData, setselectedData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 20,
    page: 0,
  });
  const [totalRow, setTotalRow] = useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url =
          "https://catalog-management-system-kxyaws5ixa-uc.a.run.app/cms/products?page=" +
          paginationModel.page +
          1;
        const { data } = await axios.get(url);
        console.log(data.products);
        setProducts(data.products);
        setTotalRow(data?.totalResults);
      } catch (error) {
        setError("Something went wrong!");
      }
    };
    fetchProducts();
  }, [paginationModel]);

  const columns = [
    {
      field: "name",
      headerName: "Item",
      width: 200,
      hide: true,
    },
    {
      field: "images",
      headerName: "Image",
      width: 150,
      flex: 1,
      renderCell: (params) => (
        <Card
          sx={{
            maxWidth: 345,
            width: 150,
            my: 4,
            height: "auto",
            boxShadow: 1,
          }}
        >
          <CardMedia
            sx={{ height: 150 }}
            image={params.row.images.front}
            title={params.row.name}
          />
        </Card>
      ),
    },
    {
      field: "main_category",
      headerName: "Category",
      width: 200,
      hide: true,
    },
    {
      field: "mrp",
      headerName: "Price",
      width: 100,
      hide: true,
      renderCell: (params) => `₹${params.row.mrp.mrp}`,
      sortComparator: (a, b) => {
        return a.mrp - b.mrp;
      },
    },
  ];

  const handleSearchProductChange = (event) => {
    setSearchProduct(event.target.value);
  };

  const categories = [
    ...new Set(products.map((product) => product.main_category)),
  ];
  categories.unshift("All");

  const handleCategoryChange = (event) => {
    setCategoryFilter(event.target.value);
  };

  const handleRowData = (id) => {
    console.log(id, products);
    const filteredData = products.filter((val) => val.name == id.id);
    console.log(filteredData);
    setselectedData(filteredData);
    handleClickOpen();
  };

  const filteredProducts = products.filter((product) => {
    if (categoryFilter === "All") {
      return product.name.toLowerCase().includes(searchProduct.toLowerCase());
    } else {
      return (
        product.main_category === categoryFilter &&
        product.name.toLowerCase().includes(searchProduct.toLowerCase())
      );
    }
  });
  // console.log(filteredProducts);

  const [sortModel, setSortModel] = React.useState([
    {
      field: "mrp",
      sort: "desc",
    },
  ]);

  return (
    <>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div">
            TwinLeaves
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
        <Box sx={{ height: 500, width: "100%" }}>
          <Grid container spacing={2} my={4}>
            <Grid item xs={12} md={4}>
              {/* <div
                className={styles["search-container"]}
                style={{ width: "300px" }}
              > */}
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  placeholder="Search by product name"
                  onChange={handleSearchProductChange}
                  sx={{ minWidth: "300px" }}
                />
              {/* </div> */}
            </Grid>
            <Grid item xs={12} md={6}>
              <Select
                value={categoryFilter}
                onChange={handleCategoryChange}
                sx={{ minWidth: "300px" }}
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <DataGrid
            rows={filteredProducts}
            rowHeight={200}
            columns={columns}
            sortModel={sortModel}
            onSortModelChange={(newSortModel) => setSortModel(newSortModel)}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
              sorting: { sortModel: [{ field: "mrp", sort: "asc" }] },
            }}
            pageSizeOptions={[20]}
            checkboxSelection
            disableRowSelectionOnClick
            getRowId={(row) => row.name}
            onRowClick={(row) => handleRowData(row)}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            paginationMode="server"
            rowCount={totalRow}
          />
        </Box>
      </Container>
      <DetailDialog
        selectedValue={selectedData}
        open={open}
        onClose={handleClose}
      />
    </>
  );
};

export default ProductList;
