
export default function ProductSummary() {
  return (
    <div className="p-5 bg-white rounded-lg card-shadow mt-5 animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Product Summary</h2>
      </div>
      
      <div className="flex flex-col md:flex-row items-center justify-around">
        <div className="circle-progress" style={{ '--percentage': '90' } as React.CSSProperties}>
          <div className="circle-progress-content">
            <span>90%</span>
          </div>
        </div>
        
        <div className="mt-6 md:mt-0 text-center">
          <div className="flex flex-col items-center">
            <h3 className="text-2xl font-bold text-primary">1,500</h3>
            <p className="text-sm text-gray-500">Quantity in hand</p>
          </div>
          
          <div className="h-8 border-l md:border-l-0 md:border-t border-gray-200 my-4"></div>
          
          <div className="flex flex-col items-center">
            <h3 className="text-2xl font-bold text-gray-400">500</h3>
            <p className="text-sm text-gray-500">To be received</p>
          </div>
        </div>
      </div>
    </div>
  );
}
