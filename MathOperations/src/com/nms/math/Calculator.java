package com.nms.math;

public class Calculator {

	public static void main(String[] args) {

		int num1 = Integer.valueOf(args[0]);
		String sign = args[1];
		int num2 = Integer.valueOf(args[2]);

		ArithmeticOperation operation = ArithmeticOperationsFactory.getInstance(sign);
		int result = operation.calculate(num1, num2);

		System.out.printf("%d %s %d is %d", num1, sign, num2, result);

	}

}
