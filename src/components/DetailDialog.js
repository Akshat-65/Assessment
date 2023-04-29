import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

function DetailDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose();
  };
  console.log(selectedValue);

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="md" fullWidth={true}>
      <DialogTitle>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          mx={3}
        >
          <Typography gutterBottom variant="h5" component="div">
            Product Detail
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {`MRP ₹${selectedValue[0]?.mrp.mrp}`}
          </Typography>
        </Stack>
      </DialogTitle>
      <Card
        sx={{ display: "flex", justifyContent: "space-around", width: "100%" }}
        p={3}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography gutterBottom variant="h5" component="div">
              {selectedValue[0]?.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {selectedValue[0]?.description}
            </Typography>
          </CardContent>
          <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="start"
              spacing={2}
              m={2}
            >
              {selectedValue[0] &&
                Object.keys(selectedValue[0]?.weights_and_measures).map(
                  (val, index) =>
                    index !== 0 && (
                      <Stack direction="row" spacing={2}>
                        <Typography variant="body2" color="text.primary">
                          {val}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {`${
                            Object.values(
                              selectedValue[0]?.weights_and_measures
                            )[index]
                          } ${
                            selectedValue[0]?.weights_and_measures
                              ?.measurement_unit
                          }`}
                        </Typography>
                      </Stack>
                    )
                )}
            </Stack>
          </Box>
        </Box>
        <CardMedia
          sx={{ width: 140, height: "auto" }}
          image={selectedValue[0]?.images?.front}
          title="product img"
          m={3}
        />
      </Card>
    </Dialog>
  );
}

export default DetailDialog;
