interface DocumentCardProps {
    title: string;
    fileName: string;
    fileType: string;
    fileSize: string;
}

const DocumentCard = ({ title, fileName, fileType, fileSize }: DocumentCardProps) => {
    return (
        <div className="max-w-80">
            <h2 className="text-base lg:text-xl text-tc-dark font-satoshiBold font-semibold mb-2">{title}</h2>
            <div className="bg-[#EBE9F4] rounded-lg p-4 flex items-center gap-4">
                <div className="w-12 h-12 bg-[#45316D] rounded-lg flex items-center justify-center">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M20 4V16.586L16.414 20.172L16 20.586H4V4H20ZM20 2H4C2.897 2 2 2.897 2 4V20.586C2 21.137 2.211 21.666 2.586 22.041L2.586 22.041C2.961 22.416 3.489 22.627 4.041 22.627H16C16.552 22.627 17.08 22.416 17.455 22.041L21.455 18.041C21.83 17.666 22.041 17.137 22.041 16.586V4C22.041 2.897 21.144 2 20.041 2H20Z"
                            fill="white"
                        />
                    </svg>
                </div>
                <div>
                    <h3 className="text-gray-700 font-satoshiMedium">{fileName}</h3>
                    <p className="text-gray-500 text-sm">
                        {fileType} • {fileSize}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DocumentCard;