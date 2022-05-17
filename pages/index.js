import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

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
			body: JSON.stringify({ input: input}),
		});
		const data = await response.json();
		setHistories((prev) => {
			return [{ input: input, result: data.result }, ...prev];
		});
		setInput("");
	}

	const onChange = (event) => {
		setInput(event.target.value);
	}

	const displayHistory = () => {
		return histories.map((history) => {
			const i = history.input;
			const r = history.result;
			return (
				<div className={styles.result}>
					<h4>Input:</h4>
					<p style={{"white-space": "pre-line"}}> {i}</p>
					<h4>Result: </h4>
					<p style={{"white-space": "pre-line"}}>{r}</p>
				</div>
			);
		})
	}

	return (
		<div>
			<Head>
				<title>Fun with GPT-3 OpenAI</title>
				<link rel="icon" href="/dog.png" />
			</Head>

			<main className={styles.main}>
				<img src="/dog.png" className={styles.icon} />
				<h3>Fun with GPT-3 OpenAI</h3>

				<form onSubmit={onSubmit}>
					<select id="input-suggestion">
						<option value="" disabled selected>Input Suggestions</option>
						<option value="Who are you?">Who are you?</option>;
					</select>
					<label>
						Enter prompt:
						<textarea rows="5" value={input} list="input-suggestion" onChange={onChange} />
					</label>
					<input type="submit" value="Send" />
				</form>
				{displayHistory()}
			</main>
		</div>
	);
}
