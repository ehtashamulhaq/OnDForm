package com.nms.math;

public class ArithmeticOperationsFactory {

	public static ArithmeticOperation getInstance(String sign) {

		if (sign.equals("+")) {
			return new Addition();
		}

		throw new UnsupportedOperationException();
	}

}
