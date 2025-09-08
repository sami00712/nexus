import React from "react";

function scorePassword(password: string) {
  let score = 0;
  if (!password) return 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (password.length >= 12) score++;
  return score;
}

export const PasswordStrengthMeter: React.FC<{ password: string }> = ({ password }) => {
  const score = scorePassword(password);
  const percent = (score / 5) * 100;
  const label =
    score <= 1 ? "Weak" :
    score === 2 ? "Fair" :
    score === 3 ? "Good" :
    score === 4 ? "Strong" :
    "Very strong";

  const color =
    score <= 1 ? "bg-red-500" :
    score === 2 ? "bg-yellow-500" :
    score === 3 ? "bg-blue-500" :
    score === 4 ? "bg-green-500" :
    "bg-emerald-600";

  return (
    <div className="mt-2">
      <div className="w-full h-2 bg-gray-200 rounded">
        <div className={`${color} h-2 rounded`} style={{ width: `${percent}%` }} />
      </div>
      <p className="text-xs text-gray-600 mt-1">{label}</p>
    </div>
  );
};
