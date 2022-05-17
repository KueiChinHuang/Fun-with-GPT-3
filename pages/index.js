import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

const examples = [
	{
		title: "Grammar correction",
		content:
			"Correct this to standard English:\n\nShe no went to the market.",
	},
	{
		title: "Text to command",
		content:
			"Convert this text to a programmatic command:\n\nText: Ask Constance if we need some bread\nCommand: send-msg `find constance` Do we need some bread?\n\nText: Contact the ski store and figure out if I can get my skis fixed before I leave on Thursday\nCommand:",
	},
	{
		title: "English to other languages",
		content:
			"Translate this into 1. French, 2. Spanish and 3. Japanese:\n\nWhat rooms do you have available?\n\n",
	},
	{
		title: "Classification",
		content:
			"The following is a list of companies and the categories they fall into:\n\nApple, Facebook, Fedex\n\n\nApple\nCategory:",
	},
];

export default function Home() {
	const [input, setInput] = useState("");
	const [histories, setHistories] = useState([]);

	const onSubmit = async (event) => {
		event.preventDefault();
		const response = await fetch("/api/generate", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ input: input }),
		});
		const data = await response.json();
		setHistories((prev) => {
			return [{ input: input, result: data.result }, ...prev];
		});
		resetForm();
	};

	const displayHistory = () => {
		return histories.map((history) => (
			<div className={styles.result}>
				<h4>Input:</h4>
				<p style={{ "white-space": "pre-line" }}>{history.input}</p>
				<h4>Result: </h4>
				<p style={{ "white-space": "pre-line" }}>{history.result}</p>
			</div>
		));
	};

	const resetForm = () => {
		document.getElementById("prompt-input-form").reset();
		setInput("");
	};

	return (
		<div>
			<Head>
				<title>Fun with GPT-3 OpenAI</title>
				<link rel="icon" href="/dog.png" />
			</Head>

			<main className={styles.main}>
				<img src="/dog.png" className={styles.icon} />
				<h3>Fun with GPT-3 OpenAI</h3>

				<form id="prompt-input-form" onSubmit={onSubmit}>
					<label>
						Enter prompt:
						<textarea
							rows="8"
							value={input}
							onChange={(event) => setInput(event.target.value)}
						></textarea>
					</label>
					<label>
						Inspiration:
						<select
							id="input-suggestion"
							onChange={(event) => setInput(event.target.value)}
						>
							<option value="" disabled selected>
								Select an example...
							</option>
							{examples.map((example) => (
								<option value={example.content}>
									{example.title}
								</option>
							))}
						</select>
					</label>
					<div className={styles.buttonGroup}>
						<button type="reset" onClick={resetForm}>
							Clear
						</button>
						<button type="submit">Send</button>
					</div>
				</form>

				{displayHistory()}
			</main>
		</div>
	);
}
