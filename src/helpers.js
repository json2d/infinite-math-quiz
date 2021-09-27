function halve(digits) {
  let rv = [];
  let carry = 0;
  digits.forEach(d => {
    let halfx10 = d * 5 + carry * 10;
    //take x10 to prevent rounding
    rv.push((halfx10 / 10) | 0);
    carry = halfx10 % 10;
  });
  if (carry) {
    rv.push(carry);
  }
  return rv;
}

function repeatapply(f, x, n = 0) {
  while (n-- > 0) {
    x = f(x);
  }
  return x;
}

function aspercent(digits) {
  // Put decimal point after three digits.
  let integer = digits.slice(0, 3);
  let fractional = digits.slice(3);
  // Padding.
  integer = integer.concat([0, 0, 0]).slice(0, 3);
  //Remove leading zeros.
  while (integer[0] === 0) {
    integer.shift();
  }
  // Empty => 0
  if (integer.length === 0) {
    integer = [0];
  }
  // Remove trailing 0s.
  while (fractional[fractional.length - 1] === 0) {
    fractional.pop();
  }
  let rv = integer.join("");
  if (fractional.length !== 0) {
    rv += "." + fractional.join("");
  }
  return rv;
}

//Makes huge assumptions about the digits.
function subtractFrom100(digits) {
  let rv = digits.map(d => 9 - d);
  rv[0] = 0;
  rv.push(rv.pop() + 1); //assumes no trailing 0
  return rv;
}

export const applyZenos = n => {
  const one = [1];
  return aspercent(subtractFrom100(repeatapply(halve, one, n)));
};
