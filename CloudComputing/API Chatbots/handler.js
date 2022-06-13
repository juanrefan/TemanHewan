const { nanoid } = require('nanoid')
const chats = require('./chats')

const MessageHandler = (request, h) => {
  const { message } = request.payload

  const id = nanoid(10)
  const insertedAt = new Date().toISOString()
  const updatedAt = insertedAt
  const newMessage = { id, message, insertedAt, updatedAt }
  //
  //

  if (message === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal mengirim pesan'
    })
    response.code(400)
    return response
  }

  chats.push(newMessage)

  // check if Books exist
  const isSuccess = chats.filter((mesage) => mesage.id === id).length > 0
  //
  //
  if (isSuccess) {
    if (message === 'berat badan kucing turun, kucing bersin-bersin dan tidak mau makan. mata kucing juga membengkak dan berair') {
      const response = h.response({
        status: 'success',
        message: 'Defnisi: Cat scratch disease (CSD) adalah infeksi yang disebabkan oleh bakteri Bartonella henselae, dan spesies Bartonella lainnya yang lebih jarang. Penyebab: Kucing dapat terinfeksi B. henselae dari gigitan kutu dan kotoran kutu (kotoran) yang masuk ke dalam lukanya. Dengan menggaruk dan menggigit kutu, kucing mengambil kotoran kutu yang terinfeksi di bawah kuku dan sela-sela giginya. Penanganan:  Gunakan produk perawatan dan pencegahan kutu yang efektif direkomendasikan dan tersedia dari dokter hewan Anda. . Bicaralah dengan dokter hewan Anda tentang pengujian dan perawatan untuk kucing Anda. Dokter hewan Anda dapat memberi tahu Anda apakah kucing Anda memerlukan pengujian atau perawatan',
        data: {
          mesageId: id
        }
      })
      response.code(201)
      return response
    } else if (message === 'anjing saya bulunya rontok sering garuk-garuk dikulitnya ada kerak dan banyak kutu') {
      const response = h.response({
        status: 'success',
        message: 'Definisi: Pruritus adalah rasa gatal atau rasa tidak nyaman pada kulit yang merangsang keinginan untuk menggaruk, menggosok, menjilat, atau menggigit bagian tersebut. Pada kondisi normal, pruritus diperlukan anjing untuk membersihkan tubuh dan menghilangkan ektoparasit serta senyawa atau bahan-bahan yang berbahaya dari permukaan kulit. Sebaliknya, apabila reaksinya berlebihan pruritus dapat menyebabkan perlukaan diri sendiri atau self mutilation yang mengakibat luka lecet pada permukaan kulit. Penyebab: Penyebab penyakit ini adalah parasit, infeksi jamur, alergi karena makanan dan bukan tidak mungkin juga kalau si penderita mengidap penyakit kelenjar, tiroid dan lain-lain. Biasanya terjadi pada jenis peliharaan yang perawatannya kurang higienis. Bisa juga karena kulit kering, suhu udara yang terlalu panas/dingin dan terkena cahaya/sinar/listrik, dll. Penanganan: -Cukur bulu terutama dibagian yang korengan atau meradang -Mandikan dengan shampoo anti jamur yang bisa anda beli di petshop atau klinik hewan -Lakukan perawatan secara konsisten dan disiplin. Lakukan pembersihan pada tempat makan dan minumnya juga dengan tempat tidur atau kandang anjing anda',
        data: {
          mesageId: id
        }
      })
      response.code(201)
      return response
    }
  }
  const response = h.response({
    status: 'fail',
    message: 'Pesan gagal'
  })
  response.code(500)
  return response
}

module.exports = { MessageHandler }
