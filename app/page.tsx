"use client"
//useEffect->何かのタイミングで自動実行する機能
import{useState,useEffect}from "react";
export default function Home() //画面全体
{
  //h1で大きいタイトル
  //h2見出し
  //classNameは見た目設定。
  //div箱みたいな物
  //=>処理する方法
  //p 本文表示


  const [title,setTitle]= useState("");
  const [content,setContent]= useState("");
  const [image,setImage]=useState("");
  const [video,setVideo]=useState("");
  const [editIndex,setEditIndex]=useState<number|null>(null);


const [diaries,setDiaries]= useState<
{
  title:string;
  content:string;
  date:string;
  image:string;
  video:string;
}[]
>([]);

const addDiary =()=>{

  if(title===""||content==="")return;

const newDiary={

title:title,
content: content,
date: new Date().toLocaleDateString(),
image:image,
video:video,

};

//編集中なら上書き。そうじゃないなら追加
if(editIndex !==null){

  const newDiaries=[...diaries];
  newDiaries[editIndex]=newDiary;
  setDiaries(newDiaries);
  setEditIndex(null);
}
else{
  setDiaries([newDiary,...diaries]);
}

setTitle("");
setContent("");
setImage("");
setVideo("");

};

const deleteDiary=(index:number)=>{
  //confirmブラウザ標準機能
  const check = confirm("本当に削除しますか？");

  if(!check) return;

  const newDiaries=diaries.filter(
  (_,diaryIndex)=>diaryIndex!==index
  );
setDiaries(newDiaries);
};

useEffect(()=>{
const savedDiaries=localStorage.getItem("diaries");
//localStorage.getItem=>保存された("  ")取得

if(savedDiaries){
  setDiaries(JSON.parse(savedDiaries));
  //JSON.parse=>日記データを戻す
}

},[]);
//[]->最初の一回だけ実行

useEffect(()=>{
localStorage.setItem(
"diaries",JSON.stringify(diaries));

},[diaries]);

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


<input
//file=ファイル選択
type="file"
//image=画像選択
accept="image/*"

onChange={(e)=>{
const file = e.target.files?.[0];
if(!file) return;
//ブラウザ表示するためのURL
const imageUrl =URL.createObjectURL(file);
setImage(imageUrl);
}}
/>

<input
type="file"
accept="video/*"

onChange={(e)=>{

const file = e.target.files?.[0];
if(!file) return;
const videoUrl=URL.createObjectURL(file);
setVideo(videoUrl);

}}
/>

<button 
onClick={addDiary}
className="bg-blue-500 text-white px-10 py-4 rounded-2xl">
 {editIndex !==null ? "更新する":"投稿する"}
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

 {diary.image &&(

<img
src={diary.image}
alt="diary image"
className="w-full rounded-xl mb-4"

/>
)}

{diary.video &&(

<video
src={diary.video}
controls
className="w-full rounded-xl mb-4"
//w-full 横幅いっぱい表示
//rounded-xl　角丸
//mb-4　下余白
/>
)}

<p className="text-gray-800 whitespace-pre-wrap">
  {diary.content}
</p>

<button
onClick={()=>deleteDiary(index)}
className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg">
  削除
</button>

<button
onClick={()=>{
console.log("編集押された")
   setTitle(diary.title);
   setContent(diary.content);
   setImage(diary.image);
   setVideo(diary.video);
   setEditIndex(index);
}}
className="mt-4 mr-2 bg-yellow-500 text-white px-4 py-2 rounded-lg"
>
  編集
</button>
</div>
))}

</div>
</main>
  );
}