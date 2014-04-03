package com.nms.math;

import java.io.Console;

public class Calculator {

	public static void main(String[] args) {

		System.out.println("Enter an operand\n");
		Console console = System.console();
		int num1 = Integer.valueOf(console.readLine());

		System.out.println("Enter another operand\n");
		int num2 = Integer.valueOf(console.readLine());

		System.out.println("Select an operation +\n");
		String sign = console.readLine();
		ArithmeticOperation operation = ArithmeticOperationsFactory.getInstance(sign);

		System.out.println("************************\n");
		System.out.printf("The result is %d", operation.calculate(num1, num2));

	}

}
