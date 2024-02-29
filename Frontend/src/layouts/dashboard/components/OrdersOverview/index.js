import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

import TimelineItem from "examples/Timeline/TimelineItem";
import { useEffect, useState } from "react";
import Api from "utils/Api";

function OrdersOverview({ id }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchData() {
      console.log("this is working");
      try{
        const res = await Api.get(`TicketComments/GetTicketCommentsForTicket?ticket_id=${id}`);
        console.log("token==>>", res.data);
        setComments(res.data);
      }
      catch(e){
        console.log("err==>>", e)
      }

    }
    fetchData();
  }, []);

  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={3} px={3}>
        <MDTypography variant="h6" fontWeight="medium">
          Ticket SR-{id.substr(id.length - 5)}
        </MDTypography>
      </MDBox>
      <MDBox p={2}>
        {comments.map((comment, i) => {
          return (
            <TimelineItem
              key={i}
              color="success"
              icon="notifications"
              title={comment.description}
              dateTime="22 DEC 7:20 PM"
            />
          );
        })}

        {/* <TimelineItem
          color="error"
          icon="inventory_2"
          title="Pending approval from manager"
          dateTime="21 DEC 11 PM"
        />
        <TimelineItem
          color="info"
          icon="shopping_cart"
          title="Approved from manager"
          dateTime="21 DEC 9:34 PM"
        />
        <TimelineItem
          color="warning"
          icon="payment"
          title="Ticket in progress"
          dateTime="20 DEC 2:20 AM"
        />
        <TimelineItem
          color="primary"
          icon="vpn_key"
          title="Ticket Resolved"
          dateTime="18 DEC 4:54 AM"
          lastItem
        /> */}

        {/* <MDButton>View</MDButton> */}
        <Button onClick={() => window.location.href = `/viewform/${id}`} >View Details</Button>
      </MDBox>
    </Card>
  );
}

export default OrdersOverview;
