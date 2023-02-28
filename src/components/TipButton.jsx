import React from "react";

function TipButton({ tipValue, handleGetTipFromButton }) {
	return (
		<>
			<button
				className="btn text-light grid-item  tip-btn "
				value={tipValue}
				onClick={handleGetTipFromButton}
			>
				{tipValue}%
			</button>
		</>
	);
}

export default TipButton;
