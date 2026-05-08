<script setup>
import { ref } from 'vue';
import { useLayoutStore } from '@/stores/layout.js';

const message = ref('这是 Test 页面');
const cacheStore = useLayoutStore();
const pagingList = ref([]);
Array.from({ length: 50 }).forEach((_, $i) => {
  pagingList.value.push({ id: $i });
});

// 重置首页缓存
const resetHomeCache = () => {
  cacheStore.removeActive('Home');
  console.log('已重置 Home 缓存');
};
usePage((once) => {
  if (once) {
    console.log('test once');
  }
  console.log('test actived');
});
</script>

<template>
  <MyPage>
    <template #header-right>
      <el-button @click="$router.push({ name: 'TestPageAdd' })">新增</el-button>
    </template>
    <template #default="{ maxHeight }">
      <el-table :data="pagingList" border :max-height="maxHeight">
        <el-table-column v-for="item in 20" label="id" prop="id" min-width="100"></el-table-column>
      </el-table>
      <!-- <div class="test_wrap">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis ut ullam dolores deserunt
        amet doloribus pariatur nisi ipsum, cum fugit voluptas tempora iste impedit corrupti
        mollitia cupiditate unde totam rerum! Tenetur molestiae, vitae tempora reiciendis, enim
        earum doloremque eius temporibus necessitatibus vero nam maxime iusto odit minima laudantium
        amet praesentium distinctio sint rem suscipit officiis rerum non fugit molestias? Quisquam.
        Corporis quam eos nam provident perferendis, tenetur velit neque voluptate ipsa veniam?
        Ducimus magnam cumque animi illo beatae cupiditate, iusto sed doloremque aperiam tenetur
        debitis, rem, exercitationem officiis odio id! Officia, minima. Ullam assumenda, fuga ad
        iusto adipisci nam velit excepturi porro esse tempore distinctio, recusandae rerum
        temporibus ut blanditiis voluptatum error eius dolores totam enim. Magni harum sunt ratione.
        Maxime eos labore voluptatibus cum voluptatum animi aliquid vel perspiciatis tempora rem
        iste asperiores harum magni, ut saepe dolores beatae dolorem, doloribus eius! Vitae modi
        recusandae, repellat totam commodi debitis. Possimus ab in nemo laborum animi temporibus,
        est ullam commodi ea qui ad repudiandae suscipit consectetur amet! Enim accusamus similique,
        inventore autem ut eum recusandae ipsam numquam animi adipisci officia. Commodi excepturi in
        repudiandae voluptate pariatur quidem corporis sint dolores accusamus obcaecati, voluptas
        ratione rerum eligendi quibusdam laudantium recusandae dolorem aliquid nisi, earum magnam
        repellat debitis dolore dolor neque. Libero. Facilis sit reiciendis perferendis dolore
        doloremque sequi architecto iure. Voluptate et dolor incidunt, consequuntur, cupiditate
        porro laudantium hic, maiores ad nisi deserunt aspernatur. Harum impedit est repellat
        deleniti error facere! Sint saepe magni adipisci consequatur tenetur omnis quia a eius dicta
        molestiae? Nobis esse corporis, quidem fuga repellendus dolorum ipsa modi. Assumenda ea
        minus doloribus minima consequuntur mollitia animi tenetur! Quidem nihil laborum reiciendis
        voluptas hic quaerat libero similique eaque porro quas, accusantium pariatur nesciunt
        placeat laboriosam. Consequatur animi numquam dolore similique vel aliquam cumque, repellat,
        harum nemo consectetur voluptates? Deleniti unde architecto, rem exercitationem consequuntur
        mollitia id quaerat nemo repellendus, a optio quidem doloribus? Inventore ipsa, quam
        consectetur possimus magni iure suscipit ducimus adipisci mollitia quibusdam velit quas
        atque. Similique optio exercitationem dolor recusandae voluptates molestias totam aliquid
        provident sit assumenda vel autem ad repellat sequi est enim nihil expedita ut obcaecati
        eveniet commodi, soluta harum labore nobis. Repudiandae! Vero neque repudiandae reiciendis
        enim libero, dolor dicta. Nisi officia aperiam est, expedita cumque nihil magnam esse
        eligendi accusamus voluptate laborum optio voluptatum nobis architecto soluta maiores
        facilis, facere consequuntur. Officiis neque quasi dolorem necessitatibus doloremque illo
        distinctio nisi rem, ipsam voluptatibus explicabo modi! Saepe quibusdam nemo vel harum ea,
        nam atque aliquam, recusandae perferendis voluptatum accusantium quos sequi deserunt!
        Quaerat ab, quisquam reprehenderit suscipit, amet odit similique tempora natus odio qui
        molestiae dignissimos, nam eius. Eaque molestias voluptate excepturi corrupti libero quam
        accusamus odit laboriosam, eius magnam molestiae ullam? Commodi tempora modi dicta mollitia
        nesciunt eveniet nulla expedita, in, sunt, voluptatem sequi. Ratione et quaerat sapiente!
        Explicabo, odio reiciendis iste aut possimus reprehenderit tempora nulla quod quae ipsum
        dignissimos. Reprehenderit illo, consectetur eum dolorum quasi tempora obcaecati
        necessitatibus velit, ipsa, nostrum delectus quisquam ad dolores earum beatae nihil sapiente
        repellat doloremque sit ea enim incidunt perferendis. Voluptas, natus laborum. Minus dolores
        facilis quasi eius eveniet odit et iure perferendis ad hic perspiciatis aut amet neque
        inventore adipisci itaque voluptatem sit, animi reprehenderit molestiae veniam consequuntur
        dolorem alias. Id, commodi. At porro impedit, tempora veritatis laboriosam necessitatibus
        voluptatum fugiat itaque a quidem voluptatem, neque nulla quos ab sint alias. Excepturi
        temporibus dolores eaque et praesentium error odit laudantium hic dicta? Animi, magnam odio
        voluptatem voluptate itaque aut nihil, neque tempora et, eos molestiae? Nisi ipsa aut
        nesciunt voluptatibus repellendus, et quod laborum delectus! Atque beatae optio deserunt
        enim sapiente ab.
      </div> -->
    </template>
    <template #down>
      <div class="down_btn_wrap">
        <el-button type="warning">填充</el-button>
        <el-button type="primary">确定</el-button>
        <el-button>取消</el-button>
      </div>
    </template>
  </MyPage>
</template>

<style lang="scss" scoped>
.test_wrap {
  width: 700px;
}
</style>
