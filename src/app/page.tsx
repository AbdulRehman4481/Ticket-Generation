"use client";
import Loader from "@/(components)/Loader/Loader";
import UseHome from "@/hooks/useHome";



export default function Home() {
  const {filteredTicket,pdfRef,loading,downloadPDF,filteredUser,setUsername,setCompanyname,setEmail,handleGenerateTicket,setJobtitle,jobtitle,companyname}=UseHome()


  return (
    <div>
      <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-[350px] sm:w-[400px]">
          <h1 className="text-3xl font-bold text-gray-700 mb-6 text-center">
            Dashboard
          </h1>
          {
            loading ? <Loader />:
          <>
            {filteredTicket ? (
            <div
            className="text-center bg-white p-6 rounded-lg shadow-lg   mt-8"
            ref={pdfRef}
          >
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Your Ticket</h2>
            <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg">
              <p className="mb-2">
                <strong className="font-bold text-gray-700">Username:</strong> {filteredTicket.username}
              </p>
              <p className="mb-2">
                <strong className="font-bold text-gray-700">Email:</strong> {filteredTicket.email}
              </p>
              <p className="mb-2">
                <strong className="font-bold text-gray-700">Phone:</strong> {filteredUser?.phone}
              </p>
              <p className="mb-2">
                <strong className="font-bold text-gray-700">Company Name:</strong> {filteredTicket.companyname}
              </p>
              <p className="mb-4">
                <strong className="font-bold text-gray-700">Job Title:</strong> {filteredTicket.jobtitle}
              </p>
            </div>
            <button
              onClick={downloadPDF}
              className="bg-blue-600 text-white py-3 px-4 mt-6 rounded-xl shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105"
            >
              Download PDF
            </button>
          </div>
          
          ) : (
            <div className="flex flex-col space-y-4">
              <input
                type="text"
                placeholder="Username"
                value={filteredUser?.username }
                onChange={(e) => setUsername(e.target.value)}
                readOnly={!!filteredUser}
                className="border border-gray-300 rounded-xl p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Email"
                value={filteredUser?.email }
                onChange={(e) => setEmail(e.target.value)}
                readOnly={!!filteredUser}
                className="border border-gray-300 rounded-xl p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Company Name"
                value={companyname}
                onChange={(e) => setCompanyname(e.target.value)}
                className="border border-gray-300 rounded-xl p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Job Title"
                value={jobtitle}
                onChange={(e) => setJobtitle(e.target.value)}
                className="border border-gray-300 rounded-xl p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleGenerateTicket}
                className="bg-blue-600 text-white py-3 px-4 rounded-xl shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105"
              >
                Generate Ticket
              </button>
            </div>
          )}
          </>
          }
        </div>
      </div>
    </div>
  );
}
