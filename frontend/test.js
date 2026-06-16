fetch('https://lodhi-school-erp.vercel.app/')
  .then(r=>r.text())
  .then(t=>{ 
     const match = t.match(/src="\/assets\/(index-[^\.]+\.js)"/); 
     if(match) { 
       fetch('https://lodhi-school-erp.vercel.app/assets/' + match[1])
         .then(r=>r.text())
         .then(js=>console.log(js.includes('backend-seven-pi-23.vercel.app') ? 'Found API URL' : 'Not found')); 
     } else { 
       console.log('No JS found'); 
     } 
  })
