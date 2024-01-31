import { Avatar, Dialog, DialogContent, Rating } from "@mui/material";
import React from "react";
import Slide from "@mui/material/Slide";

//transition
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function BranchDetailsDialog({ isOpen, Details, handleClose, ratingDetails }) {
  const ratingsValue = Details.ratingsTotal / Details.ratingsCount;
  console.log("details ", Details);
  return (
    <>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <h3>Details</h3>
          <div style={{ padding: "0 30px" }}>
            <div className="flex justify--content--spacebet rating--container">
              <p>Branch name </p>
              <p>{Details.businessName}</p>
            </div>
            <div className="flex justify--content--spacebet  rating--container">
              <p>Branch address </p>
              <p>{Details.businessAddress}</p>
            </div>
            <div className="flex justify--content--spacebet  rating--container">
              <p>Customers rated </p>
              <p>{Details.ratingsCount}</p>
            </div>
            <div className="flex justify--content--spacebet  rating--container">
              <p>services </p>
              <p>{Details.services.length}</p>
            </div>
          </div>
          <h3>Star Rating System</h3>
          <div className="flex justify--content--spacebet gap-7">
            {/* <div style={{ alignItems: "center", textAlign: "center" }}>
              <p
                style={{ fontSize: "40px", fontWeight: "bold", margin: "2px" }}
              >
                {console.log(ratingsValue)}
                {ratingsValue ? ratingsValue.toFixed(2) : 0}
              </p>
              <Rating
                name="half-rating-read"
                size="small"
                value={ratingsValue.toFixed(2)}
                precision={0.5}
                readOnly
              />
              <p style={{ margin: "2px", fontSize: "12px" }}>Total Ratings</p>
            </div> */}

            <div>
              <div
                style={{
                  width: "200px",
                  height: "10px",
                  marginBottom: "10px",
                  borderRadius: "2px",
                  backgroundColor: "skyblue",
                }}
              ></div>
              <div
                style={{
                  width: "160px",
                  height: "10px",
                  marginBottom: "10px",
                  borderRadius: "2px",
                  backgroundColor: "skyblue",
                }}
              ></div>
              <div
                style={{
                  width: "120px",
                  height: "10px",
                  marginBottom: "10px",
                  borderRadius: "2px",
                  backgroundColor: "skyblue",
                }}
              ></div>
              <div
                style={{
                  width: "80px",
                  height: "10px",
                  marginBottom: "10px",
                  borderRadius: "2px",
                  backgroundColor: "skyblue",
                }}
              ></div>
              <div
                style={{
                  width: "40px",
                  height: "10px",
                  marginBottom: "5px",
                  borderRadius: "2px",
                  backgroundColor: "skyblue",
                }}
              ></div>
            </div>

            <div>
              <div className="flex center-flex gap-3">
                <Rating
                  name="half-rating-read"
                  size="small"
                  value={5}
                  precision={0.5}
                  readOnly
                />
                <p className="margin-0">Amazing</p>
              </div>
              <div className="flex center-flex">
                <Rating
                  name="half-rating-read"
                  size="small"
                  value={4}
                  precision={0.5}
                  readOnly
                />
                <p className="margin-0">Good</p>
              </div>
              <div className="flex ">
                <Rating
                  name="half-rating-read"
                  size="small"
                  value={3}
                  precision={0.5}
                  readOnly
                />
                <p className="margin-0">Fair</p>
              </div>
              <div className="flex center-flex">
                <Rating
                  name="half-rating-read"
                  size="small"
                  value={2}
                  precision={0.5}
                  readOnly
                />
                <p className="margin-0">Poor</p>
              </div>
              <div className="flex center-flex">
                <Rating
                  name="half-rating-read"
                  size="small"
                  value={1}
                  precision={0.5}
                  readOnly
                />
                <p className="margin-0">Terrible</p>
              </div>
            </div>
          </div>
          <h3>Reviews</h3>

          {ratingDetails === "noratings" ? (
            <p>No ratings yet</p>
          ) : (
            ratingDetails.map((rating, i) => (
              <div key={i} className="flex center-flex gap-3 margin-b-5">
                <div style={{ minWidth: "100px" }}>
                  <Avatar
                    alt="Customer profile picture"
                    src={rating.customerProfile}
                    sx={{ width: 56, height: 56 }}
                  />
                  <p className="margin-00">{rating.customerName}</p>
                </div>
                <div>
                  <Rating
                    value={rating.rating}
                    precision={0.5}
                    name="half-rating-read"
                    size="small"
                    readOnly
                  />

                  <p className="margin-00">
                    &ldquo;{rating.ratingComment}&ldquo;
                  </p>
                </div>
              </div>
            ))
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default BranchDetailsDialog;
