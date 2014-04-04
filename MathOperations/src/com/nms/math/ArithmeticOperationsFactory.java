package com.nms.math;

public class ArithmeticOperationsFactory {

	public static ArithmeticOperation getInstance(String sign) {

		if (sign.equals("+")) {
			return new Addition();
		}else if (sign.equals("-")) {
			//FIXME: Subtraction class is missing
			return new Subtraction();
		}

		throw new UnsupportedOperationException();
	}

}
