//  Example of keygen with password 'weak123' salt 'a' and keylength 16   //

var key = genKey('weak123', 'a', 16);
console.log(key);
//=> af338921bf9c17b821e1e0749b3dc6f6

var iv = genKey('weak123', 'a', 8);
console.log(key);
//=> af338921bf9c17b821e1e0749b3dc6f6

// Example of encryption //

var message = 'Secret Message';
enc = encrypt(val, message, key, iv);
console.log(enc);
//=> de1859160802f77b8f1d69d56b60e3e1

dec = decrypt(enc, key, iv);
console.log(dec);
//=> Secret Message

// Example of hashing //

// console.log(hashit('RaviKumar'));
// //=> d245156b7987a9c37a2eed20c25dc8284ae5382af6ce5046d18059351b21211d
console.log('------------------------------------------');
console.log(
  encrypt(
    val,
    'Ravi',
    genKey('password', 'sfdsf', 16),
    genKey('password', 'sfdsf', 8)
  )
);
console.log(
  decrypt(
    '610715786674fb9a722947108012c562',
    genKey('password', 'sfdsf', 16),
    genKey('password', 'sfdsf', 8)
  )
);
