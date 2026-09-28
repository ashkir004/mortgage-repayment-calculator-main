import { createElement } from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";

import MortgageCalculator from "../src/components/MortgageCalculator";

describe("Mortgage Calculator - validation", () => {
    it("shows an error when the mortgage amount is empty", async () => {
        const user = userEvent.setup();

        render(createElement(MortgageCalculator));

        await user.click(
        screen.getByRole("button", {
            name: /calculate repayment/i,
        }),
        );

        expect(
        screen.getAllByText(/this field is required/i).length,
        ).toBeGreaterThan(0);
    });

    it("shows an error when the mortgage term is empty", async () => {
        const user = userEvent.setup();

        render(createElement(MortgageCalculator));

        const amountInput = screen.getByLabelText(/mortgage amount/i);

        await user.type(amountInput, "300000");

        await user.click(
        screen.getByRole("button", {
            name: /calculate repayment/i,
        }),
        );

        expect(
        screen.getAllByText(/this field is required/i).length,
        ).toBeGreaterThan(0);
    });

    it("shows an error when the interest rate is empty", async () => {
        const user = userEvent.setup();

        render(createElement(MortgageCalculator));

        await user.type(screen.getByLabelText(/mortgage amount/i), "300000");

        await user.type(screen.getByLabelText(/mortgage term/i), "25");

        await user.click(
        screen.getByRole("button", {
            name: /calculate repayment/i,
        }),
        );

        expect(
        screen.getAllByText(/this field is required/i).length,
        ).toBeGreaterThan(0);
    });

    it("does not show validation errors when all required fields are valid", async () => {
        const user = userEvent.setup();

        render(createElement(MortgageCalculator));

        await user.type(screen.getByLabelText(/mortgage amount/i), "300000");

        await user.type(screen.getByLabelText(/mortgage term/i), "25");

        await user.type(screen.getByLabelText(/interest rate/i), "5");

        await user.click(screen.getByLabelText(/repayment/i));

        await user.click(
        screen.getByRole("button", {
            name: /calculate repayment/i,
        }),
        );

        expect(
        screen.queryByText(/this field is required/i),
        ).not.toBeInTheDocument();
    });

    it("renders the success results when the form is valid", async () => {
        const user = userEvent.setup();

        render(createElement(MortgageCalculator));

        await user.type(screen.getByLabelText(/mortgage amount/i), "300000");
        await user.type(screen.getByLabelText(/mortgage term/i), "25");
        await user.type(screen.getByLabelText(/interest rate/i), "5");
        await user.click(screen.getByLabelText(/repayment/i));
        await user.click(
        screen.getByRole("button", { name: /calculate repayment/i }),
        );

        expect(
        screen.getByRole("heading", { name: /^your results$/i }),
        ).toBeInTheDocument();
        expect(screen.getByText(/your monthly repayments/i)).toBeInTheDocument();
    });

    it("renders the interest-only results when the user selects that mortgage type", async () => {
        const user = userEvent.setup();

        render(createElement(MortgageCalculator));

        await user.type(screen.getByLabelText(/mortgage amount/i), "300000");
        await user.type(screen.getByLabelText(/mortgage term/i), "25");
        await user.type(screen.getByLabelText(/interest rate/i), "5");
        await user.click(screen.getByLabelText(/interest only/i));
        await user.click(
        screen.getByRole("button", { name: /calculate repayment/i }),
        );

        expect(
        screen.getByRole("heading", { name: /^your results$/i }),
        ).toBeInTheDocument();
        expect(screen.getByText(/your monthly repayments/i)).toBeInTheDocument();
        expect(screen.getByText(/£1,250\.00/i)).toBeInTheDocument();
    });

    it("clears the form and returns to the initial state", async () => {
        const user = userEvent.setup();

        render(createElement(MortgageCalculator));

        await user.type(screen.getByLabelText(/mortgage amount/i), "300000");
        await user.type(screen.getByLabelText(/mortgage term/i), "25");
        await user.type(screen.getByLabelText(/interest rate/i), "5");
        await user.click(screen.getByLabelText(/repayment/i));
        await user.click(
        screen.getByRole("button", { name: /calculate repayment/i }),
        );

        expect(
        screen.getByRole("heading", { name: /^your results$/i }),
        ).toBeInTheDocument();

        await user.click(screen.getByRole("button", { name: /clear all/i }));

        expect(
        screen.getByRole("heading", { name: /results shown here/i }),
        ).toBeInTheDocument();
        expect(screen.getByLabelText(/mortgage amount/i)).toHaveValue("");
        expect(screen.getByLabelText(/mortgage term/i)).toHaveValue("");
        expect(screen.getByLabelText(/interest rate/i)).toHaveValue("");
    });
});
