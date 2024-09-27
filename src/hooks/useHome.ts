import jsPDF from "jspdf";
import { Magic } from "magic-sdk";
import { useEffect, useRef, useState } from "react";
interface User {
  username: string;
  email: string;
  phone: string;
  city: string;
}
interface Ticket {
  username: string;
  email: string;
  companyname: string;
  jobtitle: string;
}
export default function UseHome() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState("");
  const [companyname, setCompanyname] = useState("");
  const [jobtitle, setJobtitle] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUsers] = useState<User[]>([]);
  const [loginUser, setLoginUsers] = useState<string | null>(null);
  const [filteredUser, setFilteredUser] = useState<User | null>(null);
  const [filteredTicket, setFilteredTicket] = useState<Ticket | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const fetchTickets = async () => {
    try {
      const response = await fetch("/api/ticket");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTickets(data.ticket || []);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  const handleGenerateTicket = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        email,
        username,
        companyname,
        jobtitle,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
      };

      await fetch("https://ticket-generation.vercel.app/api/ticket", requestOptions);
      await fetchTickets();
    } catch (error) {
      console.error("Error generating ticket:", error);
    }
  };

  useEffect(() => {
    const magic = new Magic(process.env.PUBLISHABLE_API_KEY||"");

    async function getUserInfo() {
      try {
        setLoading(true);

        const isLoggedIn = await magic.user.isLoggedIn();
        if (isLoggedIn) {
          const userMetadata = await magic.user.getInfo();
          setLoginUsers(userMetadata.email);
        } else {
          console.log("User is not logged in");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error retrieving user information:", error);
        setLoading(false);
      }
    }

    getUserInfo();
  }, []);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("/api/user");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUsers(data.users || []);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchTickets();
  }, [filteredUser]);

  useEffect(() => {
    if (loginUser) {
      const matchedUser = user.find((usr) => usr.email === loginUser);
      setFilteredUser(matchedUser || null);
      setEmail(matchedUser?.email || "");
      setUsername(matchedUser?.username || "");
    }
  }, [user, loginUser]);

  useEffect(() => {
    if (filteredUser) {
      const filterTicket = tickets.find(
        (ticket) => ticket.email === filteredUser.email
      );
      setFilteredTicket(filterTicket || null);
    }
  }, [tickets, filteredUser]);

  const pdfRef = useRef(null);

  const downloadPDF = () => {
    const pdf = new jsPDF();

    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 20;
    const lineHeight = 10;
    let yOffset = margin;

    pdf.setFontSize(26);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(0, 51, 102);
    pdf.text("Ticket Detail", pageWidth / 2, margin, { align: "center" });

    pdf.setLineWidth(0.5);
    pdf.line(margin, margin + 10, pageWidth - margin, margin + 10);

    yOffset += 30;
    pdf.setFontSize(12);
    pdf.setTextColor(33, 37, 41);

    yOffset += lineHeight;
    pdf.text(`Name: ${filteredTicket?.username}`, margin + 10, yOffset);
    yOffset += lineHeight;
    pdf.text(`Email: ${filteredTicket?.email}`, margin + 10, yOffset);
    yOffset += lineHeight;
    pdf.text(`Phone: ${filteredUser?.phone}`, margin + 10, yOffset);
    yOffset += lineHeight;
    pdf.text(
      `Company Name: ${filteredTicket?.companyname}`,
      margin + 10,
      yOffset
    );
    yOffset += lineHeight;
    pdf.text(`Job Title: ${filteredTicket?.jobtitle}`, margin + 10, yOffset);
    pdf.save(`#${filteredTicket?.username}.pdf`);
  };
  return {
    filteredTicket,
    pdfRef,
    downloadPDF,
    filteredUser,
    setUsername,
    setCompanyname,
    setEmail,
    handleGenerateTicket,
    setJobtitle,
    jobtitle,
    companyname,
    loading,
  };
}
