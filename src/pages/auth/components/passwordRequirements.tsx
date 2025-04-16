const PasswordRequirements = () => {
  const requirements = [
    " Use 8 or more characters",
    "Use upper and lower case letters (e.g. Aa)",
    "Use a number (e.g. 1234)",
    "Use a symbol (e.g. !@#$)",
  ];

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-[#4E5967]">
      {requirements.map((text, index) => (
        <div key={index} className="flex items-center space-x-2">
           <div className="h-1.5 w-1.5 rounded-full bg-[#66666699]" />
          <p>{text}</p>
        </div>
      ))}
    </div>
  );
};

export default PasswordRequirements;
