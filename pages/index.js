import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
	const [input, setInput] = useState("");
	const [results, setResults] = useState([]);

	async function onSubmit(event) {
		event.preventDefault();
		const response = await fetch("/api/generate", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ input }),
		});
		const data = await response.json();
		setResults((prev) => {
			return [{ input: input, result: data.result }, ...prev];
		});
		setInput("");
	}

	async function onChange(event) {
		setInput(event.target.value);
	}

	return (
		<div>
			<Head>
				<title>Fun with GPT-3 OpenAI</title>
				<link rel="icon" href="/dog.png" />
			</Head>

			<main className={styles.main}>
				<img src="/dog.png" className={styles.icon} />
				<h3>Fun with API</h3>

				<form onSubmit={onSubmit}>
					<label>
						Enter prompt:
						<textarea rows="5" value={input} onChange={onChange} />
					</label>
					<input type="submit" value="Send" />
				</form>
				{results.map((result) => {
					return (
						<div className={styles.result}>
							<p>Input: {result.input}</p>
							<p>Result: {`${result.result}`}</p>
						</div>
					);
				})}
			</main>
		</div>
	);
}
