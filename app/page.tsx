"use client"
//useEffect->何かのタイミングで自動実行する機能
import{useState,useEffect}from "react";
import { addDoc, collection,getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

export default function Home() //画面全体
{
  //h1で大きいタイトル
  //h2見出し
  //classNameは見た目設定。
  //div箱みたいな物
  //=>処理する方法
  //p 本文表示

  //日記の主要部分
  const [title,setTitle]= useState("");
  const [content,setContent]= useState("");
  const [image,setImage]=useState("");
  const [video,setVideo]=useState("");

  //edit関連
  const [editIndex,setEditIndex]=useState<number|null>(null);
  const [editTitle,setEditTitle]=useState("");
  const [editContent,setEditContent]=useState("");

  //検索
  const [search,setSearch]=useState("");

const [diaries,setDiaries]= useState<
{
  title:string;
  content:string;
  date:string;
  image:string;
  video:string;
}[]
>([]);

const addDiary =async ()=>{

  if(title===""||content==="")return;

const newDiary={

title:title,
content: content,
date: new Date().toLocaleDateString(),
image:image,
video:video,

};

//await addDoc(collection(db,"diaries"),newDiary);
try {

  await addDoc(
    collection(db, "diaries"),
    newDiary
  );

  console.log("保存成功");

}
catch(error){

  console.error("保存失敗", error);

}
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


useEffect(() => {

  const loadDiaries = async () => {

    const querySnapshot = await getDocs(
      collection(db, "diaries")
    );

    const diaryList = querySnapshot.docs.map(
      (doc) => doc.data()
    );

    setDiaries(diaryList as any);
  };

  loadDiaries();

},[]);
//[]->最初の一回だけ実行

useEffect(()=>{
localStorage.setItem(
"diaries",JSON.stringify(diaries));

},[diaries]);

//サイトアプリの表示させる部分↓
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

<p className="text-black mb-1">
画像を追加↓
</p>

<input
//keyが変わる=別物認識：投稿した後の履歴が残らない
key={image}
//file=ファイル選択
type="file"
//image=画像選択
accept="image/*"

className="text-black mb-4 
file:bg-blue-500
file:text-white
file:border-0
file:px-1
file;py-2
file;rounded-lg"

onChange={(e)=>{
const file = e.target.files?.[0];

if(!file) return;

//ブラウザ表示するためのURL
const imageUrl =URL.createObjectURL(file);
setImage(imageUrl);
}}
/>

<p className="text-black mb-1">
  動画を追加↓
</p>

<input
key={video}
type="file"
accept="video/*"

className="text-black mb-2 
file:bg-blue-500
file:text-white
file:border-0
file:px-1
file;py-2
file;rounded-lg"

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

<div className="max-w-xl mt-8">
//検索の部分
  <input
type="text"
placeholder="検索"
value={search}
onChange={(e)=>setSearch(e.target.value)}

className="w-full border p-3 rounded-lg mb-4
text-black placeholder-gray-400"
/>

{diaries.filter((diary)=>{
return(

  //.toLowerCase():全て小文字変換する
  //.includes():if文みたいな物で()内の物と比べるため
  //検索文字が含まれているかどうか判断してる
  diary.title.toLowerCase().includes(search.toLowerCase())
  
  ||

  diary.content.toLowerCase().includes(search.toLowerCase())

);
})
.map((diary,index)=>(
<div
key={index}
className="bg-white p-5 rounded-2xl shadow-md mb-4"
>

  {editIndex==index ?(
<input
value={editTitle}
onChange={(e)=>setEditTitle(e.target.value)}

className="w-full border p-2 rounded text-black mb-2"
/>
  ):(

<h2 className="text-2xl font-bold mb-6 text-black">
  {diary.title}
</h2>
)}

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

{editIndex==index ?(
<textarea
value={editContent}
onChange={(e)=>setEditContent(e.target.value)}
className="w-full border p-2 rounded text-black h-32"
/>
):(
<p className="text-gray-800 whitespace-pre-wrap">
  {diary.content}
</p>
)}

{editIndex===index &&(
//<></>一つにまとめることができる
<>

<button
onClick={()=>{
const newDiaries=[...diaries];

newDiaries[index]={
  ...newDiaries[index],
  title:editTitle,
  content:editContent,
};
setDiaries(newDiaries);
setEditIndex(null);
setEditTitle("");
setEditContent("");
}}

className="bg-green-500 tetx-white px-4 py-2 rounded-lg mr-2"

>
  保存
</button>

<button
onClick={()=>{
setEditIndex(null);
setEditTitle("");
setEditContent("");  
}}
className="bg-gray-500 text-white px-4 py-2 rounded-lg"
>
  キャンセル
</button>

</>

)}


<button
onClick={()=>deleteDiary(index)}
className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg">
  削除
</button>

<button
onClick={()=>{

   setEditIndex(index);
   //setTitle(diary.title);
   //setContent(diary.content);
  // setImage(diary.image);
  // setVideo(diary.video);

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