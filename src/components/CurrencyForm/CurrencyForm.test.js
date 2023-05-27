import { render, screen, cleanup } from "@testing-library/react"
import CurrencyForm from "./CurrencyForm"
import userEvent from "@testing-library/user-event"

describe("Component CurrencyForm", () => {
  it("should render without crashing", () => {
    render(<CurrencyForm action={() => {}} />)
  })
  it("should run action callback with proper data on form submit", () => {
    const testCases = [
      { amount: "100", from: "PLN", to: "USD" },
      { amount: "20", from: "USD", to: "PLN" },
      { amount: "200", from: "PLN", to: "USD" },
      { amount: "345", from: "USD", to: "PLN" },
    ]

    for (const testObj of testCases) {
      const action = jest.fn()

      // render component
      render(<CurrencyForm action={action} />)

      // find "convert" button
      const submitButton = screen.getByText("Convert")

      // find fields elements
      const inputAmount = screen.getByTestId("amount")
      const selectSetFrom = screen.getByTestId("setFrom")
      const selectSetTo = screen.getByTestId("setTo")

      // set test values to fields
      userEvent.type(inputAmount, `${testObj.amount}`)
      userEvent.selectOptions(selectSetFrom, testObj.from)
      userEvent.selectOptions(selectSetTo, testObj.to)

      // simulate user click on 'convert' button
      userEvent.click(submitButton)

      // check if action callback was called once and with proper argument
      expect(action).toHaveBeenCalledTimes(1)
      expect(action).toHaveBeenCalledWith({
        amount: Number(testObj.amount),
        from: testObj.from,
        to: testObj.to,
      })

      cleanup()
    }
  })
})
