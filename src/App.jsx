import React, { useReducer, useState, useRef, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import dollarIcon from "./images/icon-dollar.svg";
import personIcon from "./images/icon-person.svg";
import Logo from "./images/logo.svg";
import "bootstrap";
import TipButton from "./components/TipButton";
function App() {
	const [bill, setBill] = useState(0);
	const [tip, setTip] = useState(0);
	const [nop, setnop] = useState(1);
	const [tipAmount, setTipAmount] = useState(0);
	const [totalAmount, setTotalAmount] = useState(0);
	useEffect(() => {
		getTipAmount(bill, tip, nop);
	}, [bill, tip, nop]);
	useEffect(() => {
		if (tip == 0) {
			setTotalAmount(0);
		} else {
			getTotalAmount(bill, tipAmount, nop);
		}
	}, [tipAmount]);

	const billRef = useRef();
	const custometipRef = useRef();
	const nopRef = useRef();

	const handleGetTipFromButton = (e) => {
		const buttons = document.querySelectorAll(".tip-btn");
		buttons.forEach((btn) => {
			btn.classList.remove("active");
		});
		//

		e.target.classList.add("active");
		//  (buttons);
		setTip(e.target.value);
	};

	function getTipAmount(bill, tip, nop) {
		let result = 0;
		result = (+bill * +tip) / +nop / 100;
		setTipAmount(result);
	}
	function getTotalAmount(bill, tipAmount, nop) {
		let result = 0;
		result = (+bill + tipAmount * nop) / nop;
		setTotalAmount(result);
	}
	const handleReset = () => {
		setBill(0);
		setTip(0);
		setnop(1);
		billRef.current.value = "";
		nopRef.current.value = "";
		custometipRef.current.value = "";
	};
	function checkNOF() {
		const validateNOPInput = document.getElementById("validateNOPInput");
		if (nopRef.current.value == 0) {
			validateNOPInput.classList.add("is-invalid");
		}
	}
	return (
		<div className=" text-center w-100 vh-100  calculator  ">
			<img src={Logo} className="my-4" />
			<div className="bg-light rounded-4  rounded  p-4 d-lg-flex inner-container">
				<div className="input-side text-start me-lg-4 ">
					<label className="my-text my-1" htmlFor="bill ">
						Bill
					</label>
					<div className="input-group mb-3 ">
						<img
							src={dollarIcon}
							className="input-group-text py-2 ps-3 border-0 "
							alt=""
						/>
						<input
							type="text"
							name="bill"
							className="form-control  inp"
							id="bill"
							ref={billRef}
							onChange={() => {
								let billValue = billRef.current.value;
								if (!isNaN(billValue) && billValue != "") {
									setBill(billValue);
								} else {
									setBill(0);
								}
							}}
						/>
					</div>
					<label className="my-text my-1"> Select Tip %</label>
					<div className=" container-fluid  grid-container">
						{[5, 10, 15, 25, 50].map((tipValue) => {
							return (
								<TipButton
									key={tipValue}
									tipValue={tipValue}
									handleGetTipFromButton={handleGetTipFromButton}
								></TipButton>
							);
						})}
						<input
							type="text"
							placeholder="Custom"
							ref={custometipRef}
							onChange={() => {
								const buttons = document.querySelectorAll(".tip-btn");
								buttons.forEach((btn) => {
									btn.classList.remove("active");
								});
								let customeTipValue = custometipRef.current.value;
								if (!isNaN(customeTipValue) && customeTipValue != "") {
									setTip(customeTipValue);
								} else {
									setTip(0);
								}
							}}
							className="  custome-input text-center text-dark  grid-item "
						/>
					</div>
					<label className="my-text mt-4 mb-2"> Number Of People</label>

					<div className="input-group mb-3  ">
						<img
							src={personIcon}
							className="input-group-text py-2 ps-3 border-0 "
							alt=""
						/>

						<input
							type="text"
							className="form-control  inp "
							onChange={() => {
								const validateNOPInput =
									document.getElementById("validateNOPInput");
								let nopValue = nopRef.current.value;
								nopValue;
								if (!isNaN(+nopValue) && +nopValue != "") {
									validateNOPInput.classList.remove("is-invalid");
									setnop(nopValue);
								} else if (nopValue == "") {
									setTipAmount(0);
									setTotalAmount(0);
									validateNOPInput.classList.remove("is-invalid");
								} else if (+nopValue == "0") {
									setTipAmount(0);
									setTotalAmount(0);
									validateNOPInput.classList.add("is-invalid");
								}
							}}
							ref={nopRef}
							id="validateNOPInput"
						/>
						<div id="validateNOPInput" className="invalid-feedback ">
							Cant Be Zero
						</div>
					</div>
				</div>
				<div className="output-side container-fluid pe-4 pt-2">
					<div className="row d-flex justify-content-between">
						<div className="col-5">
							<div className="info text-start ps-4 py-4">
								<label className="out-label"> Tip Amount</label>
								<p className="out-text ">/ Person</p>
							</div>
						</div>
						<div className="out-value col-5 ps-4 py-4f fs-1 text-center d-flex align-items-center">
							${tipAmount.toFixed(2)}
						</div>
					</div>
					<div className="row d-flex justify-content-between">
						<div className="col-5">
							<div className="info text-start ps-4 py-4">
								<label className="out-label"> Total</label>
								<p className="out-text ">/ Person</p>
							</div>
						</div>
						<div className="out-value col-5 ps-4 py-4f fs-1 text-center d-flex align-items-center">
							${totalAmount.toFixed(2)}
						</div>
					</div>
					<button className="btn out-btn p-2 mb-3" onClick={handleReset}>
						RESET
					</button>
				</div>
			</div>
		</div>
	);
}

export default App;
