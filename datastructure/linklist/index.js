/**
 * 链表节点
 */
class Node {
  constructor(element) {
    this.data = element;
    this.next = null;
  }
}

function testLinklist() {
  let head = null;
  head = new Node(1);
  head.next = new Node(2);
  head.next.next = new Node(3);
  head.next.next.next = new Node(4);
  let p = head;
  while (p != null) {
    console.log("p", p.data);
    p = p.next;
  }
}

//  如何判断单向链表是环形链表
// 第一种 借助额外的内存，哈希表
// 使用一个哈希表去存储，遍历的时候往里塞
// 如果遍历的时候发现哈希表中存在，则证明链表有环
// 第二种 借助快慢指针 快指针比慢指针快两步

// leetcode 141 142 202

// 链表反转
// 92
