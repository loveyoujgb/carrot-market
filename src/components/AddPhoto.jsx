import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { MdOutlineArrowBackIos, MdAddAPhoto, MdOutlinePostAdd, MdOutlineTune } from "react-icons/md";
import styled from "styled-components";
const Previews = (props) => {
  console.log(props);
  const [files, setFiles] = useState([]);
  const { acceptedFiles, fileRejections, getRootProps, getInputProps } = useDropzone({
    maxFiles: 5,
    maxSize: 100000000, //100메가
    accept: {
      "image/jpeg": [],
      "image/png": [], // 두가지 형식만 가능
    },
    onDrop: (acceptedFiles) => {
      console.log(files.length);
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });
  console.log(acceptedFiles);
  console.log(files);

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <div key={file.path}>
      {errors.map((e) => {
        console.log(errors);
        return (
          <div style={{ marginLeft: "10px" }} key={e.code}>
            {e.code}
          </div>
        );
      })}
    </div>
  ));

  // console.log(addFiles);
  // dispatch(addPhoto(addFiles));

  // const uploadFiles = () => {
  //   let formData = new FormData();
  //   for (var i = 0; i < acceptedFiles.length; i++) {
  //     let file = acceptedFiles[i];
  //     formData.append("articleFiles[]", file);
  //   }
  //   console.log(formData);
  //   axios({
  //     method: "post",

  //     data: formData,
  //   });
  // };

  const thumbs = files.map((file) => (
    <Thumb key={file.name}>
      <Img
        src={file.preview}
        // Revoke data uri after image is loaded
        onLoad={() => {
          URL.revokeObjectURL(file.preview);
        }}
      />
    </Thumb>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <Container>
      <input {...getInputProps()} />
      <StButton {...getRootProps()}>
        <MdAddAPhoto size="30px" />
        <Length>{files.length}/5</Length>
      </StButton>
      <ThumbsContainer>{thumbs}</ThumbsContainer>
      <div>{fileRejectionItems}</div>
    </Container>
  );
};

export default Previews;

const ThumbsContainer = styled.aside`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Container = styled.section`
  align-items: center;
  display: flex;
  flex-direction: row;
`;

const Length = styled.span`
  font-size: 12px;
  position: absolute;
  bottom: 10px;
  left: 31px;
`;

const Thumb = styled.div`
  display: inline-flex;
  width: 80px;
  height: 80px;
  padding: 4px;
  box-sizing: border-box;
`;

const Img = styled.img`
  border-radius: 12px;
  display: block;
  width: auto;
  height: 100%;
  margin-left: 5px;
`;

const StButton = styled.div`
  cursor: pointer;
  :hover {
    border: 1px solid #999999;
  }
  width: 80px;
  height: 80px;
  background-color: #f1f1f1;
  border: 1px solid #cccccc;
  border-radius: 10px;
  padding: 18px 23px;
  position: relative;
`;
