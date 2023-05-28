import ResultBox from "./ResultBox"
import { render, screen, cleanup } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import { convertPLNToUSD } from "../../utils/convertPLNToUSD"
import { convertUSDToPLN } from "../../utils/convertUSDToPLN"
import { formatAmountInCurrency } from "../../utils/formatAmountInCurrency"

describe("Compoment ResultBox", () => {
  it("should render without crashing", () => {
    render(<ResultBox from="USD" to="PLN" amount={100} />)
  })

  it("should render proper info about conversion when PLN -> USD", () => {
    const testCases = [
      { amount: "100", from: "PLN", to: "USD" },
      { amount: "700", from: "PLN", to: "USD" },
      { amount: "350", from: "PLN", to: "USD" },
      { amount: "2350", from: "PLN", to: "USD" },
      { amount: "1350", from: "PLN", to: "USD" },
      { amount: "67350", from: "PLN", to: "USD" },
    ]
    for (const testCase of testCases) {
      render(
        <ResultBox
          from={testCase.from}
          to={testCase.to}
          amount={Number(testCase.amount)}
        />
      )
      const resultBoxDiv = screen.getByTestId("resultBoxDiv")
      expect(resultBoxDiv).toHaveTextContent(
        `${formatAmountInCurrency(testCase.amount, "PLN")} = ${convertPLNToUSD(
          Number(testCase.amount)
        )}`
      )
      cleanup()
    }
  })

  it("should render proper info about conversion when USD -> PLN", () => {
    const testCases = [
      { amount: "100", from: "USD", to: "PLN" },
      { amount: "350", from: "USD", to: "PLN" },
      { amount: "1350", from: "USD", to: "PLN" },
      { amount: "3550", from: "USD", to: "PLN" },
      { amount: "50", from: "USD", to: "PLN" },
      { amount: "8350", from: "USD", to: "PLN" },
    ]
    for (const testCase of testCases) {
      render(
        <ResultBox
          from={testCase.from}
          to={testCase.to}
          amount={Number(testCase.amount)}
        />
      )
      const resultBoxDiv = screen.getByTestId("resultBoxDiv")
      expect(resultBoxDiv).toHaveTextContent(
        `${formatAmountInCurrency(
          Number(testCase.amount),
          "USD"
        )} = ${convertUSDToPLN(Number(testCase.amount))}`
      )
      cleanup()
    }
  })
  it("should return proper value when from and to are the same", () => {
    const testCases = [
      { amount: "100", from: "USD", to: "USD" },
      { amount: "350", from: "USD", to: "USD" },
      { amount: "1350", from: "USD", to: "USD" },
      { amount: "3550", from: "PLN", to: "PLN" },
      { amount: "50", from: "PLN", to: "PLN" },
      { amount: "8350", from: "PLN", to: "PLN" },
    ]
    for (const testCase of testCases) {
      render(
        <ResultBox
          from={testCase.from}
          to={testCase.to}
          amount={Number(testCase.amount)}
        />
      )
      const resultBoxDiv = screen.getByTestId("resultBoxDiv")
      expect(resultBoxDiv).toHaveTextContent(
        `${formatAmountInCurrency(
          Number(testCase.amount),
          testCase.from
        )} = ${formatAmountInCurrency(Number(testCase.amount), testCase.to)}`
      )
      cleanup()
    }
  })
  it("should return div with wrong value message when input is negative", () => {
    const testCases = [
      { amount: "-100", from: "USD", to: "PLN" },
      { amount: "-1200", from: "PLN", to: "PLN" },
      { amount: "-120", from: "USD", to: "USD" },
      { amount: "-550", from: "PLN", to: "USD" },
      { amount: "-11", from: "USD", to: "PLN" },
    ]

    for (const testCase of testCases) {
      render(
        <ResultBox
          from={testCase.from}
          to={testCase.to}
          amount={Number(testCase.amount)}
        />
      )
      const resultBoxDiv = screen.getByTestId("wrongValueDiv")
      expect(resultBoxDiv).toHaveTextContent("Wrong value...")
      cleanup()
    }
  })
})
