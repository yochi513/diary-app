"use client"
import{useState}from "react";
export default function Home() //画面全体
{
  //h1で大きいタイトル
  //h2見出し
  //classNameは見た目設定。
  //div箱みたいな物
  //=>処理する方法
  //p 本文表示
  //confirmブラウザ標準機能

  const [title,setTitle]= useState("");
  const [content,setContent]= useState("");

const [diaries,setDiaries]= useState<
{title:string; content:string; date:string}[]
>([]);

const addDiary =()=>{
if(title===""||content==="")return;
const newDiary={
title:title,
content: content,
date: new Date().toLocaleDateString(),
};
setDiaries([newDiary,...diaries]);

setTitle("");
setContent("");
};
const deleteDiary=(index:number)=>{

  const check = confirm("本当に削除しますか？");

  if(!check) return;

  const newDiaries=diaries.filter(
  (_,diaryIndex)=>diaryIndex!==index
  );
setDiaries(newDiaries);
};


  return (
    <main className="min-h-screen bg-sky-100 p-8">
      <h1 className="text-4xl font-bold mb-6 text-pink-500 ">
         私の思い出
      </h1>

<div className="bg-white p-6 rounded-2xl shadow-md max-w-xl">

<input
type="text"
placeholder="タイトルを入力"
value={title}
onChange={(e)=>setTitle(e.target.value)}
className="w-full border p-1 rounded-lg mb-4 placeholder-gray-400 text-black"
/>

<textarea
placeholder="今日の出来事を書こう・・・"
value={content}
onChange={(e)=>setContent(e.target.value)}
className="w-full border p-3 rounded-lg mb-4 h-40 placeholder-gray-400 text-black"
/>

<button 
onClick={addDiary}
className="bg-blue-500 text-white px-10 py-4 rounded-2xl">
  投稿する
</button>

      </div>

<div className="max-w-xl">

{diaries.map((diary,index)=>(
<div
key={index}
className="bg-white p-5 rounded-2xl shadow-md mb-4"
>
<h2 className="text-2xl font-bold mb-6 text-black">
  {diary.title}
</h2>

<p className="text-gray-500 mb-2">
  {diary.date}
</p>

<p className="text-gray-800 whitespace-pre-wrap">
  {diary.content}
</p>

<button
onClick={()=>deleteDiary(index)}
className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg">
  削除
</button>

</div>
))}

</div>
</main>
  );
}