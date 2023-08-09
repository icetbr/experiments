import { MyType } from './MyType';

/**
 * Test
 * @inner
 * @param {module:myModule/MyType~MyType} c The caption
 * @see MyType#navigate()
 */
 function test1(c){
    console.log(c);
    new MyType('', '').navigate();
}

/**
 * {@link MyType}
 * [link text]{@link namepathOrURL}
 * {@link namepathOrURL|link text}
 * {@link namepathOrURL link text (after the first space)}
 */
 function test2(c){
    console.log(c);
    new MyType('', '').navigate();
}

test2('a')