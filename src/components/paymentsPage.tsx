// "use client";
// import React, { useState } from "react";
// import { Card, CardHeader, CardBody } from "../components/ui/Card";
// import { Button } from "../components/ui/Button";
// import { Badge } from "../components/ui/Badge";

// interface Transaction {
//   id: number;
//   type: "Deposit" | "Withdraw" | "Transfer";
//   amount: number;
//   sender: string;
//   receiver: string;
//   status: "Completed" | "Pending" | "Failed";
// }

// export const PaymentsPage: React.FC = () => {
//   const [balance, setBalance] = useState(5000);
//   const [transactions, setTransactions] = useState<Transaction[]>([
//     {
//       id: 1,
//       type: "Deposit",
//       amount: 2000,
//       sender: "Bank",
//       receiver: "You",
//       status: "Completed",
//     },
//     {
//       id: 2,
//       type: "Transfer",
//       amount: 1000,
//       sender: "Investor A",
//       receiver: "Entrepreneur B",
//       status: "Pending",
//     },
//   ]);

//   const handleAction = (type: "Deposit" | "Withdraw" | "Transfer") => {
//     const newTx: Transaction = {
//       id: transactions.length + 1,
//       type,
//       amount: 500,
//       sender: type === "Deposit" ? "Bank" : "You",
//       receiver: type === "Withdraw" ? "Bank" : "Entrepreneur",
//       status: "Completed",
//     };

//     setTransactions([newTx, ...transactions]);
//     setBalance(
//       type === "Deposit"
//         ? balance + 500
//         : type === "Withdraw"
//         ? balance - 500
//         : balance - 500
//     );
//   };

//   return (
//     <div className="space-y-6">
//       <Card>
//         <CardHeader>
//           <h2 className="text-lg font-bold text-gray-900">Wallet Balance</h2>
//         </CardHeader>
//         <CardBody>
//           <div className="text-2xl font-bold text-primary-600">${balance}</div>
//         </CardBody>
//       </Card>

//       <div className="flex gap-3">
//         <Button onClick={() => handleAction("Deposit")}>Deposit</Button>
//         <Button onClick={() => handleAction("Withdraw")}>Withdraw</Button>
//         <Button onClick={() => handleAction("Transfer")}>Transfer</Button>
//       </div>

//       <Card>
//         <CardHeader>
//           <h2 className="text-lg font-bold text-gray-900">Transaction History</h2>
//         </CardHeader>
//         <CardBody>
//           <table className="w-full text-sm">
//             <thead>
//               <tr className="text-left border-b">
//                 <th className="p-2">Type</th>
//                 <th className="p-2">Amount</th>
//                 <th className="p-2">Sender</th>
//                 <th className="p-2">Receiver</th>
//                 <th className="p-2">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {transactions.map((tx) => (
//                 <tr key={tx.id} className="border-b hover:bg-gray-50">
//                   <td className="p-2">{tx.type}</td>
//                   <td className="p-2">${tx.amount}</td>
//                   <td className="p-2">{tx.sender}</td>
//                   <td className="p-2">{tx.receiver}</td>
//                   <td className="p-2">
//                     <Badge
//                       variant={
//                         tx.status === "Completed"
//                           ? "success"
//                           : tx.status === "Pending"
//                           ? "warning"
//                           : "error"
//                       }
//                     >
//                       {tx.status}
//                     </Badge>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </CardBody>
//       </Card>
//     </div>
//   );
// };

"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardBody } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Input } from "../components/ui/Input";

interface Transaction {
  id: number;
  type: "Deposit" | "Withdraw" | "Transfer";
  amount: number;
  sender: string;
  receiver: string;
  status: "Completed" | "Pending" | "Failed";
}

export const PaymentsPage: React.FC = () => {
  const [balance, setBalance] = useState(5000);
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 1,
      type: "Deposit",
      amount: 2000,
      sender: "Bank",
      receiver: "You",
      status: "Completed",
    },
    {
      id: 2,
      type: "Transfer",
      amount: 1000,
      sender: "Investor A",
      receiver: "Entrepreneur B",
      status: "Pending",
    },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formType, setFormType] = useState<"Deposit" | "Withdraw" | "Transfer" | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const [receiver, setReceiver] = useState<string>("");

  const handleOpenForm = (type: "Deposit" | "Withdraw" | "Transfer") => {
    setFormType(type);
    setAmount(0);
    setReceiver("");
    setIsFormOpen(true);
  };

  const handleSubmit = () => {
    if (!formType || amount <= 0) return;

    const newTx: Transaction = {
      id: transactions.length + 1,
      type: formType,
      amount,
      sender: formType === "Deposit" ? "Bank" : "You",
      receiver: formType === "Transfer" ? receiver || "Unknown" : formType === "Withdraw" ? "Bank" : "You",
      status: "Completed",
    };

    setTransactions([newTx, ...transactions]);

    if (formType === "Deposit") setBalance(balance + amount);
    if (formType === "Withdraw") setBalance(balance - amount);
    if (formType === "Transfer") setBalance(balance - amount);

    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Wallet Balance */}
      <Card className="shadow-md">
        <CardHeader>
          <h2 className="text-xl font-bold text-gray-900">Wallet Balance</h2>
        </CardHeader>
        <CardBody>
          <div className="text-3xl font-bold text-primary-600">${balance}</div>
        </CardBody>
      </Card>

      {/* Actions */}
      <div className="flex gap-3">
        <Button onClick={() => handleOpenForm("Deposit")} variant="primary">Deposit</Button>
        <Button onClick={() => handleOpenForm("Withdraw")} variant="secondary">Withdraw</Button>
        <Button onClick={() => handleOpenForm("Transfer")} variant="outline">Transfer</Button>
      </div>

      {/* Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">{formType} Funds</h3>
            <div className="space-y-3">
              <Input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                fullWidth
              />
              {formType === "Transfer" && (
                <Input
                  type="text"
                  placeholder="Receiver Name"
                  value={receiver}
                  onChange={(e) => setReceiver(e.target.value)}
                  fullWidth
                />
              )}
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <Button variant="outline" onClick={() => setIsFormOpen(false)}>Cancel</Button>
              <Button variant="primary" onClick={handleSubmit}>Confirm</Button>
            </div>
          </div>
        </div>
      )}

      {/* Transaction History */}
      <Card className="shadow-md">
        <CardHeader>
          <h2 className="text-xl font-bold text-gray-900">Transaction History</h2>
        </CardHeader>
        <CardBody>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-left border-b bg-gray-100">
                <th className="p-2">Type</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Sender</th>
                <th className="p-2">Receiver</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} className="border-b hover:bg-gray-50">
                  <td className="p-2 font-medium">{tx.type}</td>
                  <td className="p-2">${tx.amount}</td>
                  <td className="p-2">{tx.sender}</td>
                  <td className="p-2">{tx.receiver}</td>
                  <td className="p-2">
                    <Badge
                      variant={
                        tx.status === "Completed"
                          ? "success"
                          : tx.status === "Pending"
                          ? "warning"
                          : "error"
                      }
                    >
                      {tx.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
};
